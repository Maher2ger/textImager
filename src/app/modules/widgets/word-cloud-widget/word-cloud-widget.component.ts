import {Component, Input, OnChanges, OnInit } from '@angular/core';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {Store} from '@ngxs/store';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import { WordsFrequencyService } from '../../../shared/services/words-frequency.service';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: '[app-word-cloud-widget]',
  templateUrl: './word-cloud-widget.component.html',
  styleUrls: ['./word-cloud-widget.component.scss'],
  providers: [WordsFrequencyService]
})
export class WordCloudWidgetComponent implements OnInit, OnChanges {

  @Input() widgetConfiguration: WidgetConfiguration;
  view = [600, 500];
  showConfig = false;
  showText = false;
  error = false;
  wordList;
  options;

  constructor(private store: Store,
              private widgetService: WidgetsService) {
    this.options = {
        settings: {
        minFontSize: 40,
        maxFontSize: 100,
        },
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        labels: true // false to hide hover labels
    };

  }

  ngOnInit() {
      this.render();
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

  ngOnChanges(changes) {
    this.render();
  }

  calcWordsWeight() {
      var lemmasList = this.widgetConfiguration.selectedProcessingElements[0].result.lemma;
      var WordsWeightList = [];
      for (var lemma of lemmasList) {
            WordsWeightList[lemma.value] = ( typeof WordsWeightList[lemma.value] !== 'undefined' ) ? WordsWeightList[lemma.value] += 1 : 1;
      }
      return WordsWeightList;
  }

  ParseWordsList() {
      var Words = this.calcWordsWeight();
      var tmpList = [];
      for (let key in Words) {
        tmpList.push({size: Words[key], text: key});
        }
      tmpList.sort((a, b) => (a.size < b.size) ? 1 : -1);

      return  tmpList.slice(0, 200);
  }

  clacWidth(size) {
    switch (size) {
      case 'col-md-6': {
      this.view = [600, 500];
      break;
   }
      case 'col-md-4': {
      this.view = [300, 500];
      break;
   }
      case 'col-md-8': {
     this.view = [800, 500];
     break;
   }
      case 'col-md-12': {
     this.view = [1000, 500];
     break;
   }
  }
  }

  private render() {
    this.wordList = this.ParseWordsList();
  }




}
