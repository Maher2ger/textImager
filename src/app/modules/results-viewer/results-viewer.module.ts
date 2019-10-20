import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultsViewerComponent} from './results-viewer.component';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {ResultsWidgetDisplayComponent} from './results-widget-display/results-widget-display.component';
import {WidgetPickerDialogComponent} from '../dialogs/widget-picker-dialog/widget-picker-dialog.component';
import {WidgetsModule} from '../widgets/widgets.module';
import {AdHocDocumentPickerComponent} from '../dialogs/ad-hoc-document-picker/ad-hoc-document-picker.component';
import {JobDocumentPickerComponent} from '../dialogs/job-document-picker/job-document-picker.component';

@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    MaterialModule
  ],
  declarations: [
    ResultsViewerComponent,
    ResultsWidgetDisplayComponent,

  ],
  entryComponents: [
    WidgetPickerDialogComponent,
    AdHocDocumentPickerComponent,
    JobDocumentPickerComponent,
  ]
})
export class ResultsViewerModule {
}
