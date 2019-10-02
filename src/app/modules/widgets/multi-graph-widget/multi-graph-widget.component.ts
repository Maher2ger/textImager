import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CloseResultWidget,
  ToggleWidgetFullScreen,
  UpdateWidgetDocuments,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';

@Component({
  selector: '[app-multi-graph-widget]',
  templateUrl: './multi-graph-widget.component.html',
  styleUrls: ['./multi-graph-widget.component.scss']
})
export class MultiGraphWidgetComponent implements OnInit, OnChanges {

  @Input() widgetConfiguration: WidgetConfiguration;
  stacked = false;
  layout = 1;
  arrData = [];
  error = false;
  showText = false;

  splitScreen = false;

  selectedForTextView = null;

  // options
  view: any[] = [700, 450];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Gruppen';
  showYAxisLabel = true;
  yAxisLabel = 'Anzahl';
  colorScheme = {
    domain: ['#007a99', '#30302d']
  };

  constructor(private store: Store, private actions: Actions, private widgetService: WidgetsService) {
  }

  ngOnInit() {
    this.render();
    this.selectedForTextView = this.widgetConfiguration.selectedProcessingElements[0];
    this.actions.pipe(ofActionDispatched(UpdateWidgetSize, UpdateWidgetDocuments, ToggleWidgetFullScreen)).subscribe(_ => this.render());
  }

  ngOnChanges(changes) {
    this.render();
  }

  private render() {
    const data = [];
    data.push(this.addCharacterData());
    data.push(this.addTokenData());
    data.push(this.addSentencesData());
    data.push(this.addParagraphData());

    this.arrData = data;
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
    this.clacWidth(size.value);
    this.render();

  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

  changeDocuments() {
    this.widgetService.updateWidgetDocumentSelection(this.widgetConfiguration);
  }

  private clacWidth (size) {
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

  private addCharacterData() {
    return {
      'name': 'Zeichen (x100)',
      'series': [
        {
          'name': this.widgetConfiguration.selectedProcessingElements[0].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[0].rawText.length / 100)
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[1].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[1].rawText.length / 100)
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[2].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[2].rawText.length / 100)
        }
      ]
    };
  }

  private addTokenData() {
    return {
      'name': 'Token (x10)',
      'series': [
        {
          'name': this.widgetConfiguration.selectedProcessingElements[0].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[0].result.token.length / 10)
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[1].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[1].result.token.length / 10)
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[2].fileName,
          'value': (this.widgetConfiguration.selectedProcessingElements[2].result.token.length / 10)
        }
      ]
    };
  }

  private addParagraphData() {
    return {
      'name': 'Paragraphs',
      'series': [
        {
          'name': this.widgetConfiguration.selectedProcessingElements[0].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[0].result.paragraph.length
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[1].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[1].result.paragraph.length
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[2].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[2].result.paragraph.length
        }
      ]
    };
  }

  private addSentencesData() {
    return {
      'name': 'Sentences',
      'series': [
        {
          'name': this.widgetConfiguration.selectedProcessingElements[0].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[0].result.sentence.length
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[1].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[1].result.sentence.length
        },
        {
          'name': this.widgetConfiguration.selectedProcessingElements[2].fileName,
          'value': this.widgetConfiguration.selectedProcessingElements[2].result.sentence.length
        }
      ]
    };
  }

  private selectLayout (str) {
    switch (str) {
      case 1:
        this.layout = (!this.stacked) ? 1 : 3;
        break;
      case 2:
        this.layout = (!this.stacked) ? 2 : 4;
        break;

    }

  }

  setSelectedText(event, text: AbstractProcessingElement) {
    event.preventDefault();

    this.selectedForTextView = text;
  }

  toggleSplit() {
    this.store.dispatch(new ToggleWidgetFullScreen({widget: this.widgetConfiguration}));
  }

  refresh () {
    if (this.layout === 1 || this.layout === 3) {
      this.selectLayout(1);
    } else {
      this.selectLayout(2);
    }
      }
}
