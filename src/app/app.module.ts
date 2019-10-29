import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {NgxsModule} from '@ngxs/store';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppRouterModule} from './app.router.module';
import {ChartRendererComponent} from './modules/view/result-view/chart-renderer/chart-renderer.component';
import {D3Service} from 'd3-ng2-service';
import {NgPipesModule} from 'ngx-pipes';
import {ResourceManagerComponent} from './modules/resource-manager/resource-manager.component';
import {LongTermProcessingCreateComponent} from './modules/jobs-overview/long-term-processing/long-term-processing-create/long-term-processing-create.component';
import {FileUploadModule} from 'ng2-file-upload';
import {JobsOverviewModule} from './modules/jobs-overview/jobs-overview.module';
import {DialogsModule} from './modules/dialogs/dialogs.module';
import {MaterialModule} from './shared/modules/material/material.module';
import {TemplateModule} from './modules/template/template.module';
import {ResultsViewerModule} from './modules/results-viewer/results-viewer.module';
import {ResultsViewerState} from './modules/results-viewer/state/results-viewer.state';
import { AngularOpenlayersModule } from 'ngx-openlayers';



@NgModule({
  declarations: [
    AppComponent,
    ChartRendererComponent,
    ResourceManagerComponent,
    LongTermProcessingCreateComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TemplateModule,
    ResultsViewerModule,
    JobsOverviewModule,
    SharedModule,
    DialogsModule,
    AppRouterModule,
    MaterialModule,
    NgbModule,
    FileUploadModule,
    NgPipesModule,
    NgxsModule.forRoot([ResultsViewerState]),
    CoreModule,
    NgxChartsModule,
    AngularOpenlayersModule,
  ],
  providers: [
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
