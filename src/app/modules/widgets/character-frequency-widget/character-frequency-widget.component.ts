import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CloseResultWidget,
  ToggleTextRenderer,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import { WordsFrequencyService } from '../../../shared/services/words-frequency.service';

@Component({
  selector: '[app-character-frequency-widget]',
  templateUrl: './character-frequency-widget.component.html',
  styleUrls: ['./character-frequency-widget.component.scss']
})
export class CharacterFrequencyWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;
  results = [];
  width = 'col-md-6';
  view = [700, 600];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C','#D68910','#4A235A','#212F3D']
  };





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

  constructor(private store: Store,
              private actions: Actions,
              private widgetService: WidgetsService,
              private wordsFrequencyService: WordsFrequencyService) {
  }

  ngOnInit() {
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    this.results = this.wordsFrequencyService.play(text.toLowerCase());
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
