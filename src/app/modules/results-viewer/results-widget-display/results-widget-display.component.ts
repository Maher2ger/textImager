import {Component, Input, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ResultsViewerState} from '../state/results-viewer.state';
import {Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {MatDialog} from '@angular/material';
import {WidgetPickerDialogComponent} from '../../dialogs/widget-picker-dialog/widget-picker-dialog.component';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';
import {AdHocDocumentPickerComponent} from '../../dialogs/ad-hoc-document-picker/ad-hoc-document-picker.component';
import {AddResultWidget} from '../state/results-viewer.state.model';
import {WidgetsService} from '../../../core/services/common/widgets.service';
import {JobDocumentPickerComponent} from '../../dialogs/job-document-picker/job-document-picker.component';

@Component({
  selector: 'app-results-widget-display',
  templateUrl: './results-widget-display.component.html',
  styleUrls: ['./results-widget-display.component.scss']
})
export class ResultsWidgetDisplayComponent implements OnInit {

  @Input() resultViewerMode: any;

  @Select(ResultsViewerState.widgets) widgets$: Observable<WidgetConfiguration[]>;
  widgets: WidgetConfiguration[] = [];

  widgetToAdd: WidgetConfiguration = null;
  search = false;

  constructor(private dialog: MatDialog, private store: Store, private widgetService: WidgetsService) {
  }

  ngOnInit() {
    this.widgetService.setMode(this.resultViewerMode);

    this.widgets$.subscribe(
      (elements: WidgetConfiguration[]) => {
        this.widgets = elements;
      }
    );

    setTimeout(() => {
      this.widgetService.initWidgetOverview(this.resultViewerMode);
    }, 250);
  }

  showWidgetDialog(event) {
    event.preventDefault();

    this.widgetToAdd = null;

    const dialogRef = this.dialog.open(WidgetPickerDialogComponent, {
      width: '900px',
      position: {
        top: '50px'
      },
      data: this.resultViewerMode
    });

    dialogRef.afterClosed().subscribe((widget: WidgetConfiguration) => {
      if (!isNullOrUndefined(widget)) {
        this.widgetToAdd = widget;
        this.selectWidgetTexts();
      }
    });
  }






  private selectWidgetTexts() {
    if (this.resultViewerMode.type === 'AD_HOC') {
      const dialogRef = this.dialog.open(AdHocDocumentPickerComponent, {
        minWidth: '900px',
        position: {
          top: '50px'
        },
        data: {
          widget: this.widgetToAdd,
          resultViewerMode: this.resultViewerMode
        }
      });

      dialogRef.afterClosed().subscribe((widget: WidgetConfiguration) => {
        if (!isNullOrUndefined(widget)) {
          this.store.dispatch(new AddResultWidget({widget: widget}));
        }
      });
    }


    if (this.resultViewerMode.type === 'LONG_TERM') {
      const dialogRef = this.dialog.open(JobDocumentPickerComponent, {
        minWidth: '900px',
        position: {
          top: '50px'
        },
        data: {
          widget: this.widgetToAdd,
          resultViewerMode: this.resultViewerMode
        }
      });

      dialogRef.afterClosed().subscribe((widget: WidgetConfiguration) => {
        if (!isNullOrUndefined(widget)) {
          this.store.dispatch(new AddResultWidget({widget: widget}));
        }
      });
    }
  }


}
