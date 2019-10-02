import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {RegistrationDialogueComponent} from '../dialogs/registration-dialogue/registration-dialogue.component';
import {LoginDialogueComponent} from '../dialogs/login-dialogue/login-dialogue.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    NavigationComponent,
    FooterComponent
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  entryComponents: [
    RegistrationDialogueComponent,
    LoginDialogueComponent
  ]
})
export class TemplateModule {
}
