import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './modules/material/material.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {XmlPipe} from './pipes/xml.pipe';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    PageNotFoundComponent,
    XmlPipe
  ],
  exports: [
    PageNotFoundComponent,
    XmlPipe
  ]
})
export class SharedModule {
}
