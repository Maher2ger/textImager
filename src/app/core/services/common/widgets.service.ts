import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {MatDialog} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {isNullOrUndefined} from 'util';
import {v4 as uuid} from 'uuid';
import {ChangeWidgetTitleDialogComponent} from '../../../modules/dialogs/change-widget-title-dialog/change-widget-title-dialog.component';
import {
  AddResultWidget,
  UpdateWidgetDocuments,
  UpdateWidgetTitle
} from '../../../modules/results-viewer/state/results-viewer.state.model';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';
import {AdHocDocumentPickerComponent} from '../../../modules/dialogs/ad-hoc-document-picker/ad-hoc-document-picker.component';
import {JobDocumentPickerComponent} from '../../../modules/dialogs/job-document-picker/job-document-picker.component';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {widgetsAvailable} from '../../../config/widgets.available.config';
import {ResourceContainerService} from './resource.container.service';
import {DataService} from '../data/data.service';
import {forkJoin, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BigDataService} from '../data/big.data.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  mode = null;

  constructor(private store: Store, private dialog: MatDialog, private containerService: ResourceContainerService, private dataService: DataService, private bigDataService: BigDataService) {
  }

  setMode(mode) {
    this.mode = mode;
  }

  changeWidgetTitle(widget: WidgetConfiguration) {
    const dialogRef = this.dialog.open(ChangeWidgetTitleDialogComponent, {
      width: '900px',
      position: {
        top: '50px'
      },
      data: {
        widget: widget
      }
    });

    dialogRef.afterClosed().subscribe((updatedWidget: WidgetConfiguration) => {
      if (!isNullOrUndefined(updatedWidget)) {
        this.store.dispatch(new UpdateWidgetTitle({widget: updatedWidget, title: updatedWidget.name}));
      }
    });
  }

  updateWidgetDocumentSelection(widget: WidgetConfiguration) {
    let dialogRef = null;

    if (this.mode.type === 'AD_HOC') {
      dialogRef = this.dialog.open(AdHocDocumentPickerComponent, {
        minWidth: '900px',
        position: {
          top: '50px'
        },
        data: {
          widget: widget,
          resultViewerMode: this.mode
        }
      });
    } else {
      dialogRef = this.dialog.open(JobDocumentPickerComponent, {
        minWidth: '900px',
        position: {
          top: '50px'
        },
        data: {
          widget: widget,
          resultViewerMode: this.mode
        }
      });
    }

    dialogRef.afterClosed().subscribe((updateWidget: WidgetConfiguration) => {
      if (!isNullOrUndefined(updateWidget)) {
        this.store.dispatch(new UpdateWidgetDocuments({widget: updateWidget}));
      }
    });
  }

  renderTextWithHighlights(element: AbstractProcessingElement, highlight: string) {
    if (!highlight) {
      return element.rawText;
    }

    const copy = Object.assign({}, element);

    return copy.rawText.replace(new RegExp(highlight, 'gi'), match => {
      return ' <span class="sentence-holder">' + match.trim() + '</span> ';
    });
  }

  renderTextWithHighlightsWithoutTrimming(element: AbstractProcessingElement, highlight: string) {
    if (!highlight) {
      return element.rawText;
    }

    const copy = Object.assign({}, element);

    return copy.rawText.replace(new RegExp(highlight, 'gi'), match => {
      return '<span class="sentence-holder">' + match.trim() + '</span>';
    });
  }

  initWidgetOverview(resultViewerMode: any) {
    if (resultViewerMode.type === 'AD_HOC') {
      const container: ResourceContainer = this.containerService.getResourceContainerById(resultViewerMode.id);
      if (!isNullOrUndefined(container)) {
              this.store.dispatch(new AddResultWidget({widget: this.applyElements(this.buildWidgetReference(widgetsAvailable[0]), [container.processingElements[0]])}));

      if (container.processingElements.length > 2) {
        this.store.dispatch(new AddResultWidget({widget: this.applyElements(this.buildWidgetReference(widgetsAvailable[2]), [container.processingElements[0], container.processingElements[1], container.processingElements[2]])}));
      }
      }
      return of(true);
    } else {
      this.bigDataService.listJobDocuments(resultViewerMode.id, 5, 0, null)
        .subscribe((res: { documentIds: any[], page, total }) => {

          const observables = [];

          for (const element of res.documentIds) {
            observables.push(this.bigDataService.getDocument(resultViewerMode.id, element._id));
          }

          forkJoin(observables).subscribe(
            (response) => {
              const elements = [];
              for (const element of response) {
                elements.push(this.resolveProcessingResult(
                  this.dataService.parseMetadataFromJson(element),
                  this.resolveTokens(this.dataService.parseResultFromJson(element, 42, 'type4', 'type2'))
                ));
              }

              this.store.dispatch(new AddResultWidget({widget: this.applyElements(this.buildWidgetReference(widgetsAvailable[0]), [elements[0]])}));
              this.store.dispatch(new AddResultWidget({widget: this.applyElements(this.buildWidgetReference(widgetsAvailable[2]), [elements[0], elements[1], elements[2]])}));

              return of(true);
            }
          );
        });
    }
  }

  applyElements(widget, elementsAvailable) {
    for (const processingElement of elementsAvailable) {
      for (let i = 0; i < processingElement.result.sentence.length; i++) {
        processingElement.result.sentence[i].value = this.dataService.getSubStrFromCompleteTextByBeginAndEnd(
          processingElement.result.sentence[i].begin,
          processingElement.result.sentence[i].end,
          processingElement.result.sofa
        );
      }


      for (let i = 0; i < processingElement.result.lemma.length; i++) {
        processingElement.result.lemma[i].value = this.dataService.getSubStrFromCompleteTextByBeginAndEnd(
          processingElement.result.lemma[i].begin,
          processingElement.result.lemma[i].end,
          processingElement.result.sofa
        );
      }

      for (let i = 0; i < processingElement.result.paragraph.length; i++) {
        processingElement.result.paragraph[i].value = this.dataService.getSubStrFromCompleteTextByBeginAndEnd(
          processingElement.result.paragraph[i].begin,
          processingElement.result.paragraph[i].end,
          processingElement.result.sofa
        );
      }

      for (let i = 0; i < processingElement.result.token.length; i++) {
        processingElement.result.token[i].value = this.dataService.getSubStrFromCompleteTextByBeginAndEnd(
          processingElement.result.token[i].begin,
          processingElement.result.token[i].end,
          processingElement.result.sofa
        );
      }

      widget.selectedProcessingElements.push(processingElement);
    }

    return widget;
  }

  private buildWidgetReference(widget: { key, name, text, icon, requiredDocuments, defaultSize, sizesAvailable }): WidgetConfiguration {
    return {
      id: uuid(),
      key: widget.key,
      name: widget.name,
      text: widget.text,
      icon: widget.icon,
      size: widget.defaultSize,
      sizesAvailable: widget.sizesAvailable,
      mode: 'RENDER',
      ready: false,
      documentsNeeded: widget.requiredDocuments,
      selectedProcessingElements: [],
      fullscreen: false
    };
  }
  // toNlpKonfinguration
  private resolveProcessingResult(metadata: { id, fileName }, result: { begin, containerId, end, lemma, paragraph, sentence, sofa, token, location, person, organization, namedEntity, timex3, similarity }) {

    return {
      id: metadata.id,
      fileName: metadata.fileName,
      rawText: result.sofa,
      result: {
        containerId: result.containerId,
        begin: result.begin,
        end: result.end,
        sofa: result.sofa,

        paragraph: result.paragraph,
        sentence: result.sentence,
        lemma: result.lemma,
        token: result.token,
        location: result.location,
        timex3: result.timex3,
        person:  result.person,
        organization:  result.organization,
        namedEntity:  result.namedEntity,
        similarity: result.similarity
      }
    };
  }

  // toNlpKonfinguration
  private resolveTokens(parseResultFromJson: {
    containerId: string;
    begin: number;
    end: number;
    sofa: string;
    paragraph: any[];
    sentence: any[];
    lemma: any[];
    token: any[];
    location: any[],
    person: any[],
    organization:  any[],
    namedEntity:  any[],
    timex3: any[],
    similarity: any[]
  }) {
    for (let i = 0; i < parseResultFromJson.token.length; i++) {
      parseResultFromJson.token[i].value = parseResultFromJson.sofa.substr(parseResultFromJson.token[i].begin, parseResultFromJson.token[i].end);
    }

    return parseResultFromJson;
  }

}

