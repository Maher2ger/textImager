import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {ResourceContainerService} from '../../../core/services/common/resource.container.service';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';
import {DataService} from '../../../core/services/data/data.service';

@Component({
  selector: 'app-ad-hoc-document-picker',
  templateUrl: './ad-hoc-document-picker.component.html',
  styleUrls: ['./ad-hoc-document-picker.component.scss']
})
export class AdHocDocumentPickerComponent implements OnInit {

  resourceContainer: ResourceContainer = null;
  searchString = null;

  widget: WidgetConfiguration = null;

  availableProcessingElements: { element: AbstractProcessingElement, picked: boolean }[] = [];

  constructor(private ref: MatDialogRef<AdHocDocumentPickerComponent>, @Inject(MAT_DIALOG_DATA) public data: { widget: WidgetConfiguration, resultViewerMode: any }, private containerService: ResourceContainerService, private dataService: DataService) {
  }

  ngOnInit() {
    this.widget = Object.assign({}, this.data.widget);
    this.resourceContainer = this.containerService.getResourceContainerById(this.data.resultViewerMode.id);
    this.buildAvailableElements();
    this.setSelectedDocuments();
  }

  close() {
    this.ref.close(null);
  }

  private buildAvailableElements() {
    for (const element of this.resourceContainer.processingElements) {
      this.availableProcessingElements.push({
        element: element,
        picked: false
      });
    }
  }

  private setSelectedDocuments() {
    for (const element of this.availableProcessingElements) {
      if (this.widget.selectedProcessingElements.filter((e: AbstractProcessingElement) => e.id === element.element.id).length > 0) {
        element.picked = true;
      }
    }
  }

  neededLimitReached() {
    return this.widget.documentsNeeded > 0 && this.availableProcessingElements.filter((e: { element: AbstractProcessingElement, picked: boolean }) => e.picked).length >= this.data.widget.documentsNeeded;
  }

  applyElements() {
    this.widget.selectedProcessingElements = [];

    const pickedElements = this.availableProcessingElements.filter((e: { picked, element: AbstractProcessingElement }) => e.picked);

    for (const element of pickedElements) {
      const processingElement = element.element;

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

      this.widget.selectedProcessingElements.push(processingElement);

      this.ref.close(this.widget);
    }
  }

  hasDocumentSelected() {
    return this.availableProcessingElements.filter((e: { element: AbstractProcessingElement, picked: boolean }) => e.picked).length > 0;
  }
}
