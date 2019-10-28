import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {Actions, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';

@Component({
  selector: '[app-entities-widget]',
  templateUrl: './entities-widget.component.html',
  styleUrls: ['./entities-widget.component.scss']
})
export class EntitiesWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;


  constructor(private store: Store,
              private actions: Actions,
              private widgetService: WidgetsService,) { }

  ngOnInit() {
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


}
