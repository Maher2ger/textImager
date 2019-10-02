import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdHocFileRendererComponent} from './ad-hoc-processing/ad-hoc-files-editor/ad-hoc-file-renderer/ad-hoc-file-renderer.component';
import {AdHocProcessingComponent} from './ad-hoc-processing/ad-hoc-processing.component';
import {AdHocFilesEditorComponent} from './ad-hoc-processing/ad-hoc-files-editor/ad-hoc-files-editor.component';
import {JobsOverviewComponent} from './jobs-overview.component';
import {AdHocFilesCompleteCheckComponent} from './ad-hoc-processing/ad-hoc-files-editor/ad-hoc-files-complete-check/ad-hoc-files-complete-check.component';
import {AdHocLanguageStateComponent} from './ad-hoc-processing/ad-hoc-language-state/ad-hoc-language-state.component';
import {JobNlpConfigDialogComponent} from '../dialogs/job-nlp-config-dialog/job-nlp-config-dialog.component';
import {AdHocProcessingStateComponent} from './ad-hoc-processing/ad-hoc-processing-state/ad-hoc-processing-state.component';
import {LongTermProcessingComponent} from './long-term-processing/long-term-processing.component';
import {LongTermDocumentBrowserComponent} from './long-term-processing/long-term-document-browser/long-term-document-browser.component';
import {LongTermDocumentRendererComponent} from './long-term-processing/long-term-document-browser/long-term-document-renderer/long-term-document-renderer.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    NgxPaginationModule,
    SharedModule,
  ],
  declarations: [
    AdHocFileRendererComponent,
    AdHocProcessingComponent,
    AdHocFilesEditorComponent,
    JobsOverviewComponent,
    AdHocFilesCompleteCheckComponent,
    AdHocLanguageStateComponent,
    JobNlpConfigDialogComponent,
    AdHocProcessingStateComponent,
    LongTermProcessingComponent,
    LongTermDocumentBrowserComponent,
    LongTermDocumentRendererComponent
  ],
  entryComponents: [
    JobNlpConfigDialogComponent
  ]
})
export class JobsOverviewModule {
}
