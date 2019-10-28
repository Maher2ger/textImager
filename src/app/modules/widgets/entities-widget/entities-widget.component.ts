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
  widegt = 'person';
  personList = [];
  organizationList = [];
  namedEntityList = [];
  locationList = [];

  invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;+_-]+/g;


  parsePersonData() {
    var data = this.widgetConfiguration.selectedProcessingElements[0].result.person;
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    var dataList = [];
    for (var i of data) {
      var wordInText = text.substring(i.begin - 1, i.end).replace(this.invalid, "");
      this.personList.push({value: wordInText, type: i.value, sentence: this.findSentence(wordInText)});
    }
  }

  parseLocationData() {
    var data = this.widgetConfiguration.selectedProcessingElements[0].result.location;
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    var dataList = [];
    for (var i of data) {
      var wordInText = text.substring(i.begin - 1, i.end).replace(this.invalid, "");
      this.locationList.push({value: wordInText, type: i.value, sentence: this.findSentence(wordInText)});
    }
  }

  parseOrganizationData() {
    var data = this.widgetConfiguration.selectedProcessingElements[0].result.organization;
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    var dataList = [];
    for (var i of data) {
      var wordInText = text.substring(i.begin - 1, i.end).replace(this.invalid, "");
      this.organizationList.push({value: wordInText, type: i.value, sentence: this.findSentence(wordInText)});
    }
  }

  parseNamedEntityData() {
    var data = this.widgetConfiguration.selectedProcessingElements[0].result.namedEntity;
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    var dataList = [];
    for (var i of data) {
      var wordInText = text.substring(i.begin - 1, i.end).replace(this.invalid, "");
      this.namedEntityList.push({value: wordInText, type: i.value, sentence: this.findSentence(wordInText)});
    }
  }

  findSentence(time: string) {
    var sentences = this.widgetConfiguration.selectedProcessingElements[0].result.sentence;
    var sentencesStatic = this.widgetConfiguration.selectedProcessingElements[0].result.sentence;
    for (var sentence of sentences) {
      if (sentence.value.search(time) !== -1) {
        var satz = sentence.value.split(time);
        sentence.value = sentence.value.replace(time," XXXX ");
        //var sentenceTmp = sentence.value.split(time);
        //return (sentenceTmp[0] + '  <b > ' + time + ' </b> ' + sentenceTmp[1]);
        return ( satz[0] + '  <b > ' + time + ' </b> ' + satz[1]);
      }
    }
  }

  switchTo(str) {
    this.widegt = str;
  }








  constructor(private store: Store,
              private actions: Actions,
              private widgetService: WidgetsService,) { }

  ngOnInit() {
    this.parseNamedEntityData();
    this.parseOrganizationData();
    this.parsePersonData();
    this.parseLocationData();
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
