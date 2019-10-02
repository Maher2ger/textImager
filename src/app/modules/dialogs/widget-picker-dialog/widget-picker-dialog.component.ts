import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {widgetsAvailable} from '../../../config/widgets.available.config';
import {v4 as uuid} from 'uuid';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';

@Component({
  selector: 'app-widget-picker-dialog',
  templateUrl: './widget-picker-dialog.component.html',
  styleUrls: ['./widget-picker-dialog.component.scss']
})
export class WidgetPickerDialogComponent implements OnInit {

  widgets = widgetsAvailable;

  constructor(private ref: MatDialogRef<WidgetPickerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  apply(widget) {
    this.ref.close(this.buildWidgetReference(widget));
  }

  close() {
    this.ref.close(null);
  }

  private buildWidgetReference(widget: { key, name, text, icon, requiredDocuments, defaultSize, sizesAvailable }): WidgetConfiguration {
    return {
      id: uuid(),
      key: widget.key,
      name: widget.name,
      text: widget.text,
      icon: widget.icon,
      size: widget.defaultSize,
      sizesAvailable: widget.sizesAvailable,
      mode: 'RENDER',
      ready: false,
      documentsNeeded: widget.requiredDocuments,
      selectedProcessingElements: [],
      fullscreen: false
    };
  }
}
