import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../../core/store/auth.state';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Register} from '../../../core/store/auth.state.model';

@Component({
  selector: 'app-registration-dialogue',
  templateUrl: './registration-dialogue.component.html',
  styleUrls: ['./registration-dialogue.component.scss']
})
export class RegistrationDialogueComponent implements OnInit {

  @Select(AuthState.loading) loading$: Observable<boolean>;

  name = new FormControl(null);
  firstName = new FormControl(null);
  email = new FormControl(null);
  reason = new FormControl(null);
  affiliation = new FormControl(null);

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  register(){
    this.store.dispatch(new Register({
      name: this.name.value,
      firstName: this.firstName.value,
      email: this.email.value,
      reason: this.reason.value,
      affiliation: this.affiliation.value,
      noncommercial: ''
    }));
  }

  incomplete(){
    return this.name.invalid || this.firstName.invalid || this.email.invalid || this.reason.invalid || this.affiliation.invalid;
  }
}
