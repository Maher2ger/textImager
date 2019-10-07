import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {
  CloseResultWidget,
  UpdateWidgetSize
} from '../../results-viewer/state/results-viewer.state.model';
import {MatButtonToggleChange} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: '[app-location-map-widget]',
  templateUrl: './location-map-widget.component.html',
  styleUrls: ['./location-map-widget.component.scss']
})
export class LocationMapWidgetComponent implements OnInit {

    @Input() widgetConfiguration: WidgetConfiguration;
    LocationNameList = [];
    coordinates = [];

    isUndefined(o) {
    return typeof o === 'undefined';
    }

    loadLocations () {
            var theText = this.widgetConfiguration.selectedProcessingElements[0].rawText;
            var locationsList = this.widgetConfiguration.selectedProcessingElements[0].result.location;
            for (let x = 0; x < locationsList.length; x++) {
                if (!this.isUndefined(locationsList[x])) {
                    let loc = theText.substring(locationsList[x].begin - 1, locationsList[x].end);
                    this.LocationNameList.push(loc);
                }

            }
            console.log(this.LocationNameList);
    }

    fetchData(city){
      var startPoint = "http://open.mapquestapi.com/nominatim/v1/search.php?key=ox99Q2eWA9sZcYsG2ub61PDCmA3WAOaa&format=json&q=";
      var EndPoint = "&addressdetails=0&limit=1";
      this.http.get(startPoint+city+EndPoint).subscribe(
        (data) => {
            if (!this.isUndefined(data[0])) {
          this.coordinates.push([+data[0]['lat'], +data[0]['lon']]);
          }
      }
        );

      }



    fetchLocation() {
        this.loadLocations();
        var locationsList = this.LocationNameList.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
                });
        console.log(this.LocationNameList);
        console.log(locationsList);
        for (let name of locationsList){
            this.fetchData(name);
        }
      }




    constructor(private store: Store, private widgetService: WidgetsService, private http: HttpClient) {
    }

    ngOnInit() {

  }

    ngOnChanges(changes) {
        this.render();
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



    private render() {
        this.fetchLocation();
    }

    //------------------------------------------------





}
