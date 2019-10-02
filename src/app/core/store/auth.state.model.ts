export class AuthStateModel {

  loading: boolean;
  authenticated: boolean;
  session: string;
}

// Core Actions

export class Logout {
  static readonly type = '[Auth] Logout from the application';
}

// Resource Containers

export class Login {
  static readonly type = '[Auth] Login with existing account';

  constructor(public payload: { username: string, password: string }) {
  }
}

export class Register {
  static readonly type = '[Auth] Register as new user';

  constructor(public payload: { name: string, firstName: string, email: string, affiliation: string, reason: string, noncommercial: string }) {
  }
}

export class LoginSuccess {
  static readonly type = '[Auth] Login success';
}

export class InitAuth {
  static readonly type = '[Auth] Look for initial authentication';
}
