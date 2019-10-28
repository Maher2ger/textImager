import {Component, Inject, OnInit} from '@angular/core';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';
import {ResourceContainerService} from '../../../core/services/common/resource.container.service';
import {DataService} from '../../../core/services/data/data.service';
import {BigDataService} from '../../../core/services/data/big.data.service';
import {forkJoin, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-job-document-picker',
  templateUrl: './job-document-picker.component.html',
  styleUrls: ['./job-document-picker.component.scss']
})
export class JobDocumentPickerComponent implements OnInit {

  resourceContainer: ResourceContainer = null;

  widget: WidgetConfiguration = null;

  loading = false;
  resolving = false;
  page = 0;
  limit = 25;

  search: string;
  searchChanged: Subject<string> = new Subject<string>();

  asyncMeals: Observable<{ documentId: string, _id: string }[]>;
  total: number;

  selectedForWidget: { documentId: string, _id: string }[] = [];

  constructor(private ref: MatDialogRef<JobDocumentPickerComponent>, @Inject(MAT_DIALOG_DATA) public data: { widget: WidgetConfiguration, resultViewerMode: any }, private containerService: ResourceContainerService, private dataService: DataService, private bigDataService: BigDataService) {
  }

  ngOnInit() {
    this.widget = Object.assign({}, this.data.widget);

    this.searchChanged.pipe(debounceTime(750), distinctUntilChanged())
      .subscribe(search => {
        this.search = search;
        this.page = 0;
        this.getPage(this.page);
      });

    this.getPage(this.page);
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = this.bigDataService.listJobDocuments(this.data.resultViewerMode.id, this.limit, this.page, this.search)
      .pipe(tap((res: { documentIds: any[], page, total }) => {
        this.total = res.total;
        this.page = this.page + 1;
        this.loading = false;
      }), map(res => res.documentIds));
  }

  close() {
    this.ref.close(null);
  }

  neededLimitReached() {
    return this.widget.documentsNeeded > 0 && this.selectedForWidget.length >= this.data.widget.documentsNeeded;
  }

  applyElements() {
    this.widget.selectedProcessingElements = [];

    const observables = [];

    for (const element of this.selectedForWidget) {
      observables.push(this.bigDataService.getDocument(this.data.resultViewerMode.id, element._id));
    }

    this.resolving = true;

    forkJoin(observables).subscribe(
      (response) => {
        for (const element of response) {
          const processingElement = this.resolveProcessingResult(
            this.dataService.parseMetadataFromJson(element),
            this.resolveTokens(this.dataService.parseResultFromJson(element, 42, 'type4', 'type2'))
          );

          this.widget.selectedProcessingElements.push(processingElement);
          this.resolving = false;
        }

        this.ref.close(this.widget);
      }
    );
  }

  searchChangeHandler(text: string) {
    (!!text) ? text = text : text = null;
    this.searchChanged.next(text);
  }

  hasDocumentSelected() {
    return this.selectedForWidget.length > 0;
  }

  addDocument(event: MatCheckboxChange, document: { documentId: string, _id: string }) {
    if (event.checked) {
      this.selectedForWidget.push(document);
    } else {
      for (let i = 0; i < this.selectedForWidget.length; i++) {
        if (this.selectedForWidget[i]._id === document._id) {
          this.selectedForWidget.splice(i, 1);
          return;
        }
      }
    }

    console.log(this.selectedForWidget);
  }

  documentSelected(document: { documentId: string, _id: string }) {
    return this.selectedForWidget.filter((e: { documentId: string, _id: string }) => e._id === document._id).length > 0;
  }

  private resolveProcessingResult(metadata:
                                      { id, fileName },
                                  result:
                                      { begin,
                                        containerId,
                                        end,
                                        lemma,
                                        paragraph,
                                        sentence,
                                        sofa,
                                        token,
                                        location,
                                        timex3,
                                        similarity,
                                      }) {
    // toNlpKonfinguration
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
        similarity: result.similarity,
      }
    };
  }

  // toNlpKonfinguration
  private resolveTokens(parseResultFromJson:
                            { containerId: string;
                            begin: number;
                            end: number;
                            sofa: string;
                            paragraph: any[];
                            sentence: any[];
                            lemma: any[];
                            token: any[];
                            location: any[];
                            timex3: any[];
                            similarity: any[] }) {
    for (let i = 0; i < parseResultFromJson.token.length; i++) {
      parseResultFromJson.token[i].value = parseResultFromJson.sofa.substr(parseResultFromJson.token[i].begin, parseResultFromJson.token[i].end);
    }

    return parseResultFromJson;
  }
}
