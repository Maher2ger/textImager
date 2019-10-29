import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CloseResultWidget,
  ToggleTextRenderer,
  UpdateSelectedElements,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';

@Component({
  selector: '[app-simple-graph-widget]',
  templateUrl: './simple-graph-widget.component.html',
  styleUrls: ['./simple-graph-widget.component.scss']
})
export class SimpleGraphWidgetComponent implements OnInit, OnChanges {

  @Input() widgetConfiguration: WidgetConfiguration;

  config = {
    elements: 5,
    type: 'token'
  };

  options = [];

  arrData = [];
  error = false;
  showConfig = false;
  showText = false;
  highlight = null;

  // options
  view: any[] = [700, 450];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Wort';
  showYAxisLabel = true;
  yAxisLabel = 'Anzahl';
  colorScheme = {
    domain: ['#007a99', '#30302d']
  };

  constructor(private store: Store, private actions: Actions, private widgetService: WidgetsService) {
  }

  ngOnInit() {
    this.initConfig();
    this.render();

    this.actions.pipe(ofActionDispatched(ToggleTextRenderer, UpdateWidgetSize)).subscribe(_ => this.render());
  }

  ngOnChanges(changes) {
    this.render();
  }

  getWordCount() {
    let result: { name, value }[] = [];


    for (let i = 0; i < this.widgetConfiguration.selectedProcessingElements[0].result[this.config.type].length; i++) {
      const value = this.cut(this.widgetConfiguration.selectedProcessingElements[0].result.sofa, this.widgetConfiguration.selectedProcessingElements[0].result[this.config.type][i].begin, this.widgetConfiguration.selectedProcessingElements[0].result[this.config.type][i].end);

      if (isNullOrUndefined(value) || !value) {
        continue;
      }

      if (this.containsObj(value, result)) {
        // Update
        result = this.updateColumnObj(value, result);
      } else {
        // Add
        result.push(this.createColumnObj(value, 1));
      }
    }
    return result;
  }

  

  createColumnObj(label: string, value: number) {
    return {
      name: label,
      value: value
    };
  }

  // Hilfsmethode für getWordCount()

  updateColumnObj(label: string, result: { name, value }[]) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].name === label) {
        result[i].value = (result[i].value + 1);
        break;
      }
    }
    return result;
  }

  // Hilfsmethode für getWordCount()

  containsObj(label: string, result: { name, value }[]) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].name === label) {
        return true;
      }
    }
    return false;
  }

  getTopValFromArray() {
    const result = this.getWordCount();

    function compare(a, b) {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }

      return 0;
    }

    result.sort(compare);


    return result.slice(result.length - this.config.elements, result.length).reverse();
  }

  cut(str, cutStart, cutEnd) {
    return str.substr(cutStart, (cutEnd - cutStart));
  }

  private render() {
    this.arrData = this.getTopValFromArray();
    console.log(this.arrData)
    
  }

  close() {
    this.store.dispatch(new CloseResultWidget({widget: this.widgetConfiguration}));
  }

  updateSize(size: MatButtonToggleChange) {
    this.store.dispatch(new UpdateWidgetSize({widget: this.widgetConfiguration, size: size.value}));
    this.render();
  }

  onClick(event: { name: string }) {
    this.highlight = event.name;
  }

  private initConfig() {
    this.options = [];

    if (this.widgetConfiguration.selectedProcessingElements[0].result.token.length > 0) {
      this.options.push('token');
    }

    if (this.widgetConfiguration.selectedProcessingElements[0].result.lemma.length > 0) {
      this.options.push('lemma');
    }

    if (this.widgetConfiguration.selectedProcessingElements[0].result.sentence.length > 0) {
      this.options.push('sentence');
    }

    if (this.widgetConfiguration.selectedProcessingElements[0].result.paragraph.length > 0) {
      this.options.push('paragraph');
    }
  }

  changeTitle() {
    this.widgetService.changeWidgetTitle(this.widgetConfiguration);
  }

  renderHighlighted(abstractProcessingElement: AbstractProcessingElement, highlight: string) {
    return this.widgetService.renderTextWithHighlights(abstractProcessingElement, highlight);
  }

  resetHighlight(event) {
    event.preventDefault();
    this.highlight = null;
  }
}
