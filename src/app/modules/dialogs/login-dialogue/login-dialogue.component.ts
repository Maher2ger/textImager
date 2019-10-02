import {Component, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {AuthState} from '../../../core/store/auth.state';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Login, LoginSuccess} from '../../../core/store/auth.state.model';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-dialogue',
  templateUrl: './login-dialogue.component.html',
  styleUrls: ['./login-dialogue.component.scss']
})
export class LoginDialogueComponent implements OnInit {

  @Select(AuthState.loading) loading$: Observable<boolean>;

  username = new FormControl(null);
  password = new FormControl(null);

  constructor(private store: Store, private matDialogRef: MatDialogRef<LoginDialogueComponent>, private actions: Actions) {
    this.actions.pipe(ofActionDispatched(LoginSuccess)).subscribe(
      () => this.matDialogRef.close()
    );
  }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new Login({username: this.username.value, password: this.password.value}));
  }

}
