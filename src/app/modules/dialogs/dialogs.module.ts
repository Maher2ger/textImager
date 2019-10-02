import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RegistrationDialogueComponent} from './registration-dialogue/registration-dialogue.component';
import {LoginDialogueComponent} from './login-dialogue/login-dialogue.component';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {WidgetPickerDialogComponent} from './widget-picker-dialog/widget-picker-dialog.component';
import {NgPipesModule} from 'ngx-pipes';
import { AdHocDocumentPickerComponent } from './ad-hoc-document-picker/ad-hoc-document-picker.component';
import { ChangeWidgetTitleDialogComponent } from './change-widget-title-dialog/change-widget-title-dialog.component';
import { JobDocumentPickerComponent } from './job-document-picker/job-document-picker.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgPipesModule,
    ReactiveFormsModule,
    CoreModule,
    MaterialModule,
    NgxPaginationModule
  ],
  declarations: [
    RegistrationDialogueComponent,
    LoginDialogueComponent,
    WidgetPickerDialogComponent,
    AdHocDocumentPickerComponent,
    ChangeWidgetTitleDialogComponent,
    JobDocumentPickerComponent
  ],
  exports: [
    RegistrationDialogueComponent,
    LoginDialogueComponent,
    WidgetPickerDialogComponent,
    AdHocDocumentPickerComponent,
    ChangeWidgetTitleDialogComponent,
    JobDocumentPickerComponent
  ]
})
export class DialogsModule {
}
