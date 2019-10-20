import {Component, Input, OnChanges, OnInit } from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';
@Component({
  selector: '[app-time-widget]',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss']
})
export class TimeWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  showConfig = false;
  showText = false;
  error = false;
  dataList = [];
  invalid = /[°"§%()\[\]{}=\\?´`'#<>|a,;+_-]+/g;


  constructor(private widgetService: WidgetsService) {


  }

  ngOnInit() {

    this.parseTimeData();
  }

  parseTimeData() {
    var data = this.widgetConfiguration.selectedProcessingElements[0].result.timex3;
    var text = this.widgetConfiguration.selectedProcessingElements[0].rawText;
    var dataList = [];
    for (var i of data) {
      var wordInText = text.substring(i.begin - 1, i.end).replace(this.invalid, "");
      this.dataList.push({value: wordInText, type: i.type, sentence: this.findSentence(wordInText)});
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
}
