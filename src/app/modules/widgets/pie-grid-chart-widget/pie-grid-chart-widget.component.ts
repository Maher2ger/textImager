import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {
  CloseResultWidget,
  ToggleTextRenderer,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';

@Component({
  selector: '[app-pie-grid-chart-widget]',
  templateUrl: './pie-grid-chart-widget.component.html',
  styleUrls: ['./pie-grid-chart-widget.component.scss']
})
export class PieGridChartWidgetComponent implements OnInit {

  @Input() widgetConfiguration: WidgetConfiguration;
  layout = 1;
  showConfig = false;
  showText = false;
  error = false;
  chars = true;
  tokens = true;
  lemmas = false;
  sentences = true;
  paragraphs = true;
  view: any[] = [700, 450];
  data = [];
  // options
  single: any[];
  multi: any[];


  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C','#D68910','#4A235A','#212F3D']
  };

  // pie
  showLabels = true;
  explodeSlices = true;
  doughnut = true;
  autoScale = true;


  //----------------------------------------------------------------





  constructor(private store: Store, private actions: Actions, private widgetService: WidgetsService) {
  }

  ngOnInit() {
    this.render();

    this.actions.pipe(ofActionDispatched(ToggleTextRenderer, UpdateWidgetSize)).subscribe(_ => this.render());
  }

  ngOnChanges(changes) {
    this.render();
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  private render() {
    this.data = [];

    if (this.chars) {
      this.data.push({
        'name': 'Characters',
        'value': this.widgetConfiguration.selectedProcessingElements[0].rawText.length
      });
    }
    if (this.tokens) {
      this.data.push({
        'name': 'Tokens',
        'value': this.widgetConfiguration.selectedProcessingElements[0].result.token.length
      });
    }
    if (this.lemmas) {
      this.data.push({
        'name': 'Lemmas',
        'value': this.widgetConfiguration.selectedProcessingElements[0].result.lemma.length
      });
    }
    if (this.sentences) {
      this.data.push({
        'name': 'Sentences',
        'value': this.widgetConfiguration.selectedProcessingElements[0].result.sentence.length
      });
    }
    if (this.paragraphs) {
      this.data.push({
        'name': 'Paragraphs',
        'value': this.widgetConfiguration.selectedProcessingElements[0].result.paragraph.length
      });
    }
    console.log(this.data);
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
    this.clacWidth(size.value)
    this.render();
  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }



  private selectLayout (str) {
    switch (str) {
      case 1:
        this.layout = 1;
        console.log(this.layout);
        break;
      case 2:
        this.layout = 2;
        console.log(this.layout);
        break;
      case 3:
        this.layout = 3;
        console.log(this.layout);
        break;
    }
    this.render();

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
}
