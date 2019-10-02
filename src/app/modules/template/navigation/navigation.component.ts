import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {RegistrationDialogueComponent} from '../../dialogs/registration-dialogue/registration-dialogue.component';
import {Select, Store} from '@ngxs/store';
import {MatDialog} from '@angular/material';
import {LoginDialogueComponent} from '../../dialogs/login-dialogue/login-dialogue.component';
import {AuthState} from '../../../core/store/auth.state';
import {Observable} from 'rxjs';
import {AuthStateModel, Logout} from '../../../core/store/auth.state.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Select(AuthState.authenticated) authenticated$: Observable<boolean>;

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  register() {
    const dialogRef = this.dialog.open(RegistrationDialogueComponent, {
      width: '450px',
      position: {
        top: '50px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {

      }
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginDialogueComponent, {
      width: '450px',
      position: {
        top: '50px'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {

      }
    });
  }

  logout(){
    this.store.dispatch(new Logout());
  }
}
