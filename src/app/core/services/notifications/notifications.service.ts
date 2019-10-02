import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {Dir} from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  setAutoHide = true;
  autoHide = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private _dir: Dir) { }

  generateException(message: any) {
    const config = this._createConfig('black-snackbar');

    this._snackBar.open(message, undefined, config);
  }

  //
  // private methods

  private _createConfig(cssClass: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.direction = this._dir.value;
    config.panelClass = [cssClass];
    return config;
  }

}
