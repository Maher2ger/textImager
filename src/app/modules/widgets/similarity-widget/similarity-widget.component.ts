import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {Actions, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {MatButtonToggleChange} from '@angular/material';
import * as Highcharts from 'highcharts';
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsOrganization from 'highcharts/modules/organization';
import HighchartsExporting from 'highcharts/modules/exporting';
import {isUndefined} from 'util';
import HighchartsDependencywheel from 'highcharts/modules/dependency-wheel';

HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
HighchartsExporting(Highcharts);
HighchartsDependencywheel(Highcharts);


@Component({
  selector: '[app-similarity-widget]',
  templateUrl: './similarity-widget.component.html',
  styleUrls: ['./similarity-widget.component.scss']
})
export class SimilarityWidgetComponent implements OnInit {

    @Input() widgetConfiguration: WidgetConfiguration;
    showConfig = false;
    showText = false;
    error = false;
    apiData;
    Chart: any;
    theText;
    similarityGrad;
    sentencesIndexesList: any[] = [];
    similarityList: any[] = [];
    dataList: any[] = [];
    data = [];
    Sankey = false;


    parseRawData(rawdata: string) {
        var dataArray = rawdata.split(";");
        var sentencesIndexes = dataArray[0].split(",");
        this.sentencesIndexesList = sentencesIndexes;
        dataArray.shift();
        for (let item of dataArray) {
            this.similarityList.push(item.split(","));
        }

    }

    parseDataList() {
        for (let x = 0; x < this.sentencesIndexesList.length; x++) {
            this.dataList.push({
                index: this.sentencesIndexesList[x],
                similarity: this.similarityList[x]
            });


        }
    }

    completeList() {
        for (let x = 0; x < this.similarityList.length; x++) {
            for (let y = this.similarityList[x].length;
                 y < this.similarityList.length;
                 y++) {
                this.similarityList[x].unshift("0.0");
            }
        }

    }

    parseChartData() {
        this.data = [];
        for (let x = 0; x < this.dataList.length; x++) {
            for (let y = 0; y < this.dataList[x].similarity.length; y++) {
                if (parseFloat(this.dataList[x].similarity[y]) >= (this.similarityGrad / 100)) {
                    this.data.push([this.dataList[x].index,
                        this.dataList[y].index,
                        parseFloat(this.dataList[x].similarity[y])]);
                }
            }

        }
    }


    constructor(private store: Store,
                private actions: Actions,
                private widgetService: WidgetsService) {
    }

    ngOnInit() {
        this.similarityGrad = 80;
        this.theText = this.widgetConfiguration.selectedProcessingElements[0].rawText;
        this.apiData = this.widgetConfiguration.selectedProcessingElements[0].result.similarity[0].value;
        this.parseRawData(this.apiData);
        this.parseDataList();
        this.completeList();
        this.apply();

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

    create(text) {
        if (this.Sankey) {
            this.Chart = Highcharts.chart('container', {
                chart: {
                      height: 500 ,
                      width: 900,
                      type: 'sankey',
                      marginLeft:40
                }
                      ,
                title: {
                    text: ''
                },
                series: [{
                    keys: ['from', 'to', 'weight'],
                    data: this.data,
                    type: 'sankey',
                    name: 'Sankey demo series',

                }],

                });
                var thetext = text;
                Highcharts.addEvent(this.Chart.container, 'click', function ($event) {
                    if (!isUndefined(event.point)){
                        if (!isUndefined(event.point.from)) {
                            var first = event.point.options.from.split("-");
                            var last = event.point.options.to.split("-");
                            var value = parseInt(parseFloat(event.point.options.weight)*100);
                            document.getElementById('firstArea').innerText = thetext.substring(
                                parseInt(first[0]),parseInt(first[1]));
                            document.getElementById('secondArea').innerText = thetext.substring(
                                parseInt(last[0]),parseInt(last[1]));
                            document.getElementById('bar').innerText = value.toString()+"%";
                            document.getElementById('bar').style.width = value.toString()+"%";
                            document.getElementById('bar').setAttribute('aria-valuenow',value);
                        }
                    }

                });

        } else {
            this.Chart = Highcharts.chart('container', {
                    chart: {
                            margin: 0,
                            width: 700,
                            height: 500,
                        },

                title: {
                    text: ''
                },

                series: [{
                    keys: ['from', 'to', 'weight'],
                    data: this.data,
                    type: 'dependencywheel',
                    name: 'Dependency wheel series',
                    dataLabels: {
                        color: '#333',
                        textPath: {
                            enabled: true,
                            attributes: {
                                dy: 5
                            }
                        },
                        distance: 10
                    },
                    size: '95%',
                }]

            });
                    }





    var thetext = text;
    Highcharts.addEvent(this.Chart.container, 'click', function ($event) {
        if (!isUndefined(event.point)){
            if (!isUndefined(event.point.from)) {
                var first = event.point.options.from.split("-");
                var last = event.point.options.to.split("-");
                var value = parseInt(parseFloat(event.point.options.weight)*100);
                document.getElementById('firstArea').innerText = thetext.substring(
                    parseInt(first[0]),parseInt(first[1]));
                document.getElementById('secondArea').innerText = thetext.substring(
                    parseInt(last[0]),parseInt(last[1]));
                document.getElementById('bar').innerText = value.toString()+"%";
                document.getElementById('bar').style.width = value.toString()+"%";
                document.getElementById('bar').setAttribute('aria-valuenow',value);
            }
        }

    });



  }
    onClickSubmit(data) {
            this.similarityGrad = data.grad;
            this.apply();
      }
    apply() {
            this.parseChartData();
            this.create(this.theText);
      }

      changeToSankey() {
        this.Sankey = true;
        this.apply();
      }

      changeToDependencywheel() {
        this.Sankey = false;
        this.apply();
      }


}
