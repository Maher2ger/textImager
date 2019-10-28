import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {CloseResultWidget, UpdateWidgetSize} from '../../results-viewer/state/results-viewer.state.model';
import {Actions, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {MatButtonToggleChange} from '@angular/material';
import * as Highcharts from 'highcharts';



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


  sentencesIndexesList: any[] = [];
  similarityList: any[] =  [];
  dataList: any[] = [];





   title = 'hallo';
   type = 'Sankey';
   data = [
   ];
   columnNames = ['From', 'To', 'Weight' ];
   options = {
      height: 500,
      sankey: {
        node: { label: { fontName: 'Times-Roman',
                         fontSize: 14,
                         color: '#000000',
                         bold: true,
                         italic: true }, nodePadding: 40 } ,
        link: {
            color: { stroke: 'black', strokeWidth: 1, fillOpacity: 0.8 },
          colorMode: 'gradient',
          colors: ['#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f','#cab2d6', '#ffff99', '#1f78b4', '#33a02c']
        }
      }
    };
   width = 550;
   height = 500;














  parseRawData(rawdata: string) {
    var dataArray = rawdata.split(";");
    var sentencesIndexes = dataArray[0].split(",");
    this.sentencesIndexesList = sentencesIndexes;
    dataArray.shift();
    for (let item of dataArray) {
        this.similarityList.push(item.split(","));
    }

    }

  parseDataList () {
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
        /*
        var tmp = this.similarityList;
        for (let x = 0; x < this.similarityList.length; x++) {
             for (let y =x;
                y < this.similarityList.length;
                 y++) {
                 this.similarityList[y][x] = tmp[x][y];
                }
        }
        */
    }

  parseChartData () {
        for (let x = 0; x < this.dataList.length; x++) {
            for (let y = 0; y < this.dataList[x].similarity.length; y++){
                if (parseFloat(this.dataList[x].similarity[y]) >= 0.2) {
                    console.log(1);
                    this.data.push([this.dataList[x].index,
                        this.dataList[y].index,
                        parseFloat(this.dataList[x].similarity[y])*10 ]);
                }
          }

      }
   }


  constructor(private store: Store,
              private actions: Actions,
              private widgetService: WidgetsService) { }

  ngOnInit() {
    // this.rawData = this.widgetConfiguration.selectedProcessingElements[0].result.similarity[0].value;
    this.apiData= "0-66,67-73,74-180,181-202,203-334,335-409,410-522,523-562,563-673,674-800,801-940,941-1019,1020-1082,1083-1192,1193-1475,1476-1574;0.204124,0.070014,0.0,0.109109,0.087039,0.074536,0.0,0.0,0.0,0.19518,0.0,0.0,0.06455,0.176336,0.42135;0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0;0.099015,0.229175,0.146254,0.187867,0.099015,0.259281,0.114332,0.245976,0.076696,0.085749,0.108465,0.266674,0.050572;0.077152,0.123091,0.210819,0.166667,0.218218,0.19245,0.138013,0.129099,0.144338,0.273861,0.049875,0.085126;0.113961,0.29277,0.077152,0.050508,0.133631,0.351382,0.059761,0.133631,0.169031,0.369406,0.157622;0.07785,0.246183,0.080582,0.142134,0.305788,0.095346,0.213201,0.06742,0.073671,0.251478;0.105409,0.069007,0.182574,0.218218,0.08165,0.091287,0.173205,0.189264,0.107676;0.109109,0.19245,0.138013,0.129099,0.144338,0.091287,0.049875,0.085126;0.125988,0.135526,0.169031,0.094491,0.179284,0.065302,0.055728;0.079682,0.074536,0.166667,0.210819,0.057591,0.098295;0.213809,0.298807,0.075593,0.413008,0.246718;0.111803,0.070711,0.038633,0.065938;0.079057,0.086387,0.147442;0.054636,0.139876;0.050948;";
    this.parseRawData(this.apiData);
    this.parseDataList();
    this.completeList();
    this.parseChartData();
    console.log(this.data);

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
