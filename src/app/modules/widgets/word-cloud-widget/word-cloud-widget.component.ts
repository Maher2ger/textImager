import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {Store} from '@ngxs/store';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import { WordsFrequencyService } from '../../../shared/services/words-frequency.service';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: '[app-word-cloud-widget]',
  templateUrl: './word-cloud-widget.component.html',
  styleUrls: ['./word-cloud-widget.component.scss'],
  providers: [WordsFrequencyService]
})
export class WordCloudWidgetComponent implements OnInit {

  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;
  wordList;
  options: any = {};
  constructor(private store: Store,
              private widgetService: WidgetsService,
              private wordsFrequencyService: WordsFrequencyService) {
    this.options = {
        settings: {
        minFontSize: 20,
        maxFontSize: 100,
        },
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        labels: true // false to hide hover labels
    };

  }

  ngOnInit() {
      this.wordList = this.ParseWordsList();
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

      return  tmpList.slice(0, 100);
  }


}
