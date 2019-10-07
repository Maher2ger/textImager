import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {WordsFrequencyService} from '../../../shared/services/words-frequency.service';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {Actions, Store} from '@ngxs/store';


@Component({
  selector: '[app-words-length-widget]',
  templateUrl: './words-length-widget.component.html',
  styleUrls: ['./words-length-widget.component.scss'],
  providers: [WordsFrequencyService]
})
export class WordsLengthWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;

  //options
  results = [];
  words;
  lengthList = [];
  width = 'col-md-6';
  view = [700, 600];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C','#D68910','#4A235A','#212F3D']
  };

  constructor(private store: Store,
              private actions: Actions,
              private widgetService: WidgetsService) {
  }
  clacWidth(size) {
    switch (size) {
      case 'col-md-6': {
      this.view = [ 700, 600];
      break;
   }
      case 'col-md-4': {
      this.view = [ 500, 600];
      break;
   }
      case 'col-md-8': {
     this.view = [ 1100, 600];
     break;
   }
      case 'col-md-12': {
     this.view = [ 1600, 600];
     break;
   }
  }
  }

  clacWordsLengthList () {
    for (var selected of this.words) {
      var tmpList = [];
      for (let i = 0; i < selected.length; i++) {
       if (typeof(tmpList[selected[i].value.length]) !== 'undefined') {
         tmpList[selected[i].value.length] += 1;
       } else {
         tmpList[selected[i].value.length] = 1;
       }
    }
      this.lengthList.push(tmpList);
    }

  }

  parseResults () {
    for (var textData of this.lengthList) {
      var name = this.widgetConfiguration.selectedProcessingElements[this.lengthList.indexOf(textData)].fileName;
      var tmpList = [];
      for (let key in textData) {
        tmpList.push({value: textData[key], name: key});
          }
      this.results.push({"name":name,"series":tmpList});
    }

  }

  ngOnInit() {
      this.words = [this.widgetConfiguration.selectedProcessingElements[0].result.lemma,
                    this.widgetConfiguration.selectedProcessingElements[1].result.lemma,
                    this.widgetConfiguration.selectedProcessingElements[2].result.lemma];
      this.clacWordsLengthList();
      this.parseResults();
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
    this.clacWidth(size.value);


  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

}
