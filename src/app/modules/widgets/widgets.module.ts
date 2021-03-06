import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsWidgetComponent} from './statistics-widget/statistics-widget.component';
import {SimpleGraphWidgetComponent} from './simple-graph-widget/simple-graph-widget.component';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material';
import {SourceCodeWidgetComponent} from './source-code-widget/source-code-widget.component';
import {MultiGraphWidgetComponent} from './multi-graph-widget/multi-graph-widget.component';
import { TextViewerWidgetComponent } from './text-viewer-widget/text-viewer-widget.component';
import { PieGridChartWidgetComponent } from './pie-grid-chart-widget/pie-grid-chart-widget.component';
import { LocationMapWidgetComponent } from './location-map-widget/location-map-widget.component';
import { AngularOpenlayersModule } from "ngx-openlayers";
import { HttpClientModule} from '@angular/common/http';
import { WordCloudWidgetComponent } from './word-cloud-widget/word-cloud-widget.component';
import {AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import { CharacterFrequencyWidgetComponent } from './character-frequency-widget/character-frequency-widget.component';
import { WordsLengthWidgetComponent } from './words-length-widget/words-length-widget.component';
import { TimeWidgetComponent } from './time-widget/time-widget.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { SimilarityWidgetComponent } from './similarity-widget/similarity-widget.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { EntitiesWidgetComponent } from './entities-widget/entities-widget.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MaterialModule,
    NgxChartsModule,
    AngularOpenlayersModule,
    HttpClientModule,
    GoogleChartsModule,
    AgWordCloudModule.forRoot(),
    HighchartsChartModule
  ],
  declarations: [
    StatisticsWidgetComponent,
    SimpleGraphWidgetComponent,
    SourceCodeWidgetComponent,
    MultiGraphWidgetComponent,
    TextViewerWidgetComponent,
    PieGridChartWidgetComponent,
    LocationMapWidgetComponent,
    WordCloudWidgetComponent,
    CharacterFrequencyWidgetComponent,
    WordsLengthWidgetComponent,
    TimeWidgetComponent,
    SearchWidgetComponent,
    SimilarityWidgetComponent,
    EntitiesWidgetComponent

      ],
  exports: [
    StatisticsWidgetComponent,
    SimpleGraphWidgetComponent,
    SourceCodeWidgetComponent,
    MultiGraphWidgetComponent,
    TextViewerWidgetComponent,
    PieGridChartWidgetComponent,
    LocationMapWidgetComponent,
    WordCloudWidgetComponent,
    CharacterFrequencyWidgetComponent,
    WordsLengthWidgetComponent,
    TimeWidgetComponent,
    SearchWidgetComponent,
    SimilarityWidgetComponent,
    EntitiesWidgetComponent
  ],
  providers : []
})
export class WidgetsModule {
}
