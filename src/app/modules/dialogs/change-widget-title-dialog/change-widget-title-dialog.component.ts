import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';

@Component({
  selector: 'app-change-widget-title-dialog',
  templateUrl: './change-widget-title-dialog.component.html',
  styleUrls: ['./change-widget-title-dialog.component.scss']
})
export class ChangeWidgetTitleDialogComponent implements OnInit {

  widget = {
    name: null
  };

  constructor(private ref: MatDialogRef<ChangeWidgetTitleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { widget: WidgetConfiguration }) {
  }

  ngOnInit() {
    this.widget = Object.assign({}, this.data.widget);
  }

  apply() {
    this.ref.close(this.widget);
  }

  close() {
    this.ref.close(null);
  }
}
