import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CloseResultWidget,
  ToggleTextRenderer,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';


@Component({
  selector: '[app-statistics-widget]',
  templateUrl: './statistics-widget.component.html',
  styleUrls: ['./statistics-widget.component.scss']
})
export class StatisticsWidgetComponent implements OnInit, OnChanges {

  @Input() widgetConfiguration: WidgetConfiguration;

  showConfig = false;
  showText = false;


  chars = false;
  tokens = true;
  lemmas = true;
  sentences = true;
  paragraphs = true;

  data = [];
  view = undefined;

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
  
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));

    this.render();
  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

  hover(hover: MouseEvent) {
    //console.log(hover);
  }
}
