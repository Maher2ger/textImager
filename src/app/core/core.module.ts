import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {JsonApiService} from './services/api/json.api.service';
import {WikipediaService} from './services/wikipedia/wikipedia.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NotificationsService} from './services/notifications/notifications.service';
import {ApplicationState} from './store/application.state';
import {MatSnackBarModule} from '@angular/material';
import {Dir} from '@angular/cdk/bidi';
import {ResourceContainerService} from './services/common/resource.container.service';
import { NgxXml2jsonService } from 'ngx-xml2json';
import {DataService} from './services/data/data.service';
import {AuthState} from './store/auth.state';
import {AuthenticationService} from './services/authentication/authentication.service';
import {BigDataService} from './services/data/big.data.service';
import {JobsState} from './store/jobs.state';
import {ChangeWidgetTitleDialogComponent} from '../modules/dialogs/change-widget-title-dialog/change-widget-title-dialog.component';
import {WidgetsService} from './services/common/widgets.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    NgxsModule.forFeature([
      ApplicationState,
      AuthState,
      JobsState
    ])
  ],
  providers: [
    JsonApiService,
    NotificationsService,
    AuthenticationService,
    WikipediaService,
    ResourceContainerService,
    NgxXml2jsonService,
    DataService,
    BigDataService,
    WidgetsService,
    Dir
  ],
  declarations: [],
  entryComponents: [
    ChangeWidgetTitleDialogComponent
  ]
})
export class CoreModule {
}
