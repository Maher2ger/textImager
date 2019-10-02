import {RouterModule, Routes} from '@angular/router';
import {JobsOverviewComponent} from './modules/jobs-overview/jobs-overview.component';
import {AdHocFilesEditorComponent} from './modules/jobs-overview/ad-hoc-processing/ad-hoc-files-editor/ad-hoc-files-editor.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {ChartRendererComponent} from './modules/view/result-view/chart-renderer/chart-renderer.component';
import {LongTermDocumentBrowserComponent} from './modules/jobs-overview/long-term-processing/long-term-document-browser/long-term-document-browser.component';
import {ResourceManagerComponent} from './modules/resource-manager/resource-manager.component';
import {LongTermProcessingCreateComponent} from './modules/jobs-overview/long-term-processing/long-term-processing-create/long-term-processing-create.component';
import {ResultsViewerComponent} from './modules/results-viewer/results-viewer.component';
import {LongTermJobResolver} from './modules/resolvers/long-term-job-resolver';
import {AdHocJobResolver} from './modules/resolvers/ad-hoc-job.resolver';

const frontendRoutes: Routes = [
  {
    path: '',
    component: JobsOverviewComponent,
  },
  {
    path: 'files',
    component: ResourceManagerComponent,
  },
  {
    path: 'jobs/create',
    component: LongTermProcessingCreateComponent,
  },
  {
    path: 'fileBrowser/:containerId',
    component: AdHocFilesEditorComponent,
  },
  {
    path: 'documentBrowser/:jobId',
    component: LongTermDocumentBrowserComponent,
  },
  {
    path: 'results/longTerm/:jobId',
    component: ResultsViewerComponent,
    resolve: {
      info: LongTermJobResolver
    }
  },
  {
    path: 'results/adHoc/:containerId',
    component: ResultsViewerComponent,
    resolve: {
      info: AdHocJobResolver
    }
  },
  {
    path: 'chart',
    component: ChartRendererComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(frontendRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AdHocJobResolver, LongTermJobResolver]
})
export class AppRouterModule {
}
