import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractProcessingElement} from '../../../../../domain/core/abstract.processing.element';
import {Store} from '@ngxs/store';
import {ResourceContainer} from '../../../../../domain/core/resource.container';
import {RemoveProcessingElement, UpdateProcessingElement} from '../../../../../core/store/application.state.model';

@Component({
  selector: 'app-ad-hoc-file-renderer',
  templateUrl: './ad-hoc-file-renderer.component.html',
  styleUrls: ['./ad-hoc-file-renderer.component.scss']
})
export class AdHocFileRendererComponent implements OnInit, OnChanges {

  @Input() processingElement: AbstractProcessingElement;
  @Input() resourceContainer: ResourceContainer;
  @Input() disabled: boolean;

  @Output() fileClosed = new EventEmitter();

  inputText: string = null;
  headline: string = null;

  loading = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.inputText = this.processingElement.rawText;
    this.headline = this.processingElement.fileName;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputText = changes.processingElement.currentValue.rawText;
    this.headline = changes.processingElement.currentValue.fileName;
  }

  updateState(value) {
    this.store.dispatch(new UpdateProcessingElement({
      containerId: this.resourceContainer.id,
      id: this.processingElement.id,
      element: this.buildUpdatedElement(this.headline, value)
    }));
  }

  updateHeadline(headline) {
    this.store.dispatch(new UpdateProcessingElement({
      containerId: this.resourceContainer.id,
      id: this.processingElement.id,
      element: this.buildUpdatedElement(headline, this.inputText)
    }));
  }

  deleteElement() {
    this.store.dispatch(new RemoveProcessingElement({containerId: this.resourceContainer.id, id: this.processingElement.id}));
  }

  close() {
    this.fileClosed.emit();
  }

  private buildUpdatedElement(fileName: string, content: string) {
    this.processingElement.rawText = content;
    this.processingElement.fileName = fileName;
    return this.processingElement;
  }
}
