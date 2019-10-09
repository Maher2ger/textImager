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
      this.dataList.push({value: text.substring(i.begin - 1, i.end), type: i.type});
    }
    console.log(dataList);
  }
}
