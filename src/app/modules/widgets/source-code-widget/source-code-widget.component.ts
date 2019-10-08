import {Component, Input, OnInit} from '@angular/core';
import {Actions, Store} from '@ngxs/store';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';

@Component({
  selector: '[app-source-code-widget]',
  templateUrl: './source-code-widget.component.html',
  styleUrls: ['./source-code-widget.component.scss']
})
export class SourceCodeWidgetComponent implements OnInit {

  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;

  constructor(private store: Store, private widgetService: WidgetsService) {
  }

  ngOnInit() {
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
  }
}
