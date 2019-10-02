import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthStateModel, InitAuth, Login, LoginSuccess, Logout, Register} from './auth.state.model';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {NotificationsService} from '../services/notifications/notifications.service';
import {isNullOrUndefined} from 'util';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loading: false,
    authenticated: false,
    session: null
  }
})
export class AuthState {

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationsService) {
  }

  @Selector()
  static loading(state: AuthStateModel) {
    return state.loading;
  }

  @Selector()
  static authenticated(state: AuthStateModel) {
    return state.authenticated;
  }

  @Selector()
  static session(state: AuthStateModel) {
    return state.session;
  }

  /**
   * Application Core
   */

  @Action(InitAuth)
  init({patchState, dispatch}: StateContext<AuthStateModel>) {
    const session = localStorage.getItem('session');

    if (!isNullOrUndefined(session)) {
      patchState({session: session, authenticated: true, loading: false});
      dispatch(new LoginSuccess());
    } else {
      patchState({session: null, authenticated: false, loading: false});
    }
  }

  @Action(Logout)
  logout({patchState}: StateContext<AuthStateModel>) {
    localStorage.clear();
    patchState({session: null, authenticated: false, loading: false});
  }

  @Action(Login)
  login({patchState, dispatch}: StateContext<AuthStateModel>, {payload: {username, password}}: Login) {
    patchState({session: null, authenticated: false, loading: true});

    this.authenticationService.login(username, password).subscribe(
      (response: { success: boolean, message: string, result: { session: string } }) => {
        if (response.success) {
          localStorage.setItem('session', response.result.session);
          patchState({session: response.result.session, authenticated: true, loading: false});
          dispatch(new LoginSuccess());
        } else {
          this.notificationService.generateException(response.message);
          patchState({session: null, authenticated: false, loading: false});
        }
      },
      (response) => {
        patchState({session: null, authenticated: false, loading: false});
      }
    );
  }


  @Action(Register)
  register({patchState}: StateContext<AuthStateModel>, {payload: {name, firstName, affiliation, email, reason, noncommercial}}: Register) {
    patchState({session: null, authenticated: false, loading: true});

    this.authenticationService.register(name, firstName, affiliation, email, reason, noncommercial).subscribe(
      (response: { success: boolean }) => {
        if (response.success) {
          patchState({loading: false});
          this.notificationService.generateException('Danke für die Registrierung, wir prüfen jetzt ihre Daten');
        } else {
          this.notificationService.generateException('Es ist ein Fehler aufgetreten');
          patchState({loading: false});
        }
      },
      (response) => {
        patchState({loading: false});
      }
    );
  }
}
