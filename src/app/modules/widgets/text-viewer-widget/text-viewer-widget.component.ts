import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {
  CloseResultWidget,
  UpdateWidgetDocuments,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';

@Component({
  selector: '[app-text-viewer-widget]',
  templateUrl: './text-viewer-widget.component.html',
  styleUrls: ['./text-viewer-widget.component.scss']
})
export class TextViewerWidgetComponent implements OnInit {

  @Input() widgetConfiguration: WidgetConfiguration;

  selectedText = null;
  highlight = null;

  constructor(private store: Store, private actions: Actions, private widgetService: WidgetsService) {
  }

  ngOnInit() {
    this.selectedText = this.widgetConfiguration.selectedProcessingElements[0];

    this.actions.pipe(ofActionDispatched(UpdateWidgetDocuments)).subscribe(e => this.selectedText = this.widgetConfiguration.selectedProcessingElements[0]);
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

  changeDocuments() {
    this.widgetService.updateWidgetDocumentSelection(this.widgetConfiguration);
  }

  renderHighlighted(abstractProcessingElement: AbstractProcessingElement, highlight: string) {
    return this.widgetService.renderTextWithHighlightsWithoutTrimming(abstractProcessingElement, highlight);
  }

  setSelectedText(event: MouseEvent, text: AbstractProcessingElement) {
    event.preventDefault();
    this.selectedText = text;
  }
}
