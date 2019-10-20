import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {Actions, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {MatButtonToggleChange} from '@angular/material';


@Component({
  selector: '[app-search-widget]',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;
  noValue = true;
  rawText;
  indexList = [];
  searchResult;
  constructor(private store: Store, private actions: Actions, private widgetService: WidgetsService) { }

  ngOnInit() {
    this.rawText = this.widgetConfiguration.selectedProcessingElements[0].rawText;
  }

  listAllSearchResults(str) {
    if (str !== '') {
    this.indexList = [];
    var pos = 0;
    var i = -1;

    // Search the string and counts the number of e's
    while (pos !== -1) {
      pos = this.rawText.indexOf(str, i + 1);
      this.indexList.push({begin: pos , end: pos + str.length});
      i = pos;

    }
    this.indexList.pop();
    return this.indexList;

   }
  }

  switchToIndexSearch () {
    this.noValue = true;
  }

  switchToValueSearch () {
    this.noValue = false;


  }

  modifyTResult(str) {
      return str.replace(/(\r\n|\n|\r)/gm,"/n");
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
