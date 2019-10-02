import {Component, Input, OnInit} from '@angular/core';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {Store} from '@ngxs/store';
import {
  InitContentProcessing,
  RemoveResourceContainer,
  UpdateResourceContainer
} from '../../../core/store/application.state.model';
import {DefaultNlpConfiguration} from '../../../config/default.nlp.configuration';
import {JobNlpConfigDialogComponent} from '../../dialogs/job-nlp-config-dialog/job-nlp-config-dialog.component';
import {MatDialog} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {ResourceContainerService} from '../../../core/services/common/resource.container.service';

@Component({
  selector: 'app-ad-hoc-processing',
  templateUrl: './ad-hoc-processing.component.html',
  styleUrls: ['./ad-hoc-processing.component.scss']
})
export class AdHocProcessingComponent implements OnInit {

  @Input() resourceContainer: ResourceContainer;

  constructor(private store: Store, private dialog: MatDialog, private containerService: ResourceContainerService) {
  }

  ngOnInit() {
  }

  removeContainer() {
    this.store.dispatch(new RemoveResourceContainer({id: this.resourceContainer.id}));
  }

  hasCompletedLanguageDetection() {
    return this.resourceContainer.languageProcessed;
  }

  getLanguageDetectionFlag() {
    if (this.resourceContainer.languageProcessed) {
      return `Spracherkennung abgeschlossen: <strong>${this.resourceContainer.language}</strong>`;
    }

    return 'Spracherkennung noch offen';
  }

  isReadyForNlp() {
    const hasProcessingElements = this.resourceContainer.processingElements.length > 0;

    return hasProcessingElements && this.hasCompletedLanguageDetection();
  }

  hasCompletedNlpConfiguration() {
    return DefaultNlpConfiguration.hasAnyConfig(this.resourceContainer);
  }

  startProcessing(resourceContainer: ResourceContainer) {
    this.store.dispatch(new InitContentProcessing({id: resourceContainer.id}));
  }

  openNlpConfig(resourceContainer: ResourceContainer) {
    const dialogRef = this.dialog.open(JobNlpConfigDialogComponent, {
      position: {
        top: '50px'
      },
      minWidth: '800px',
      data: {
        resourceContainer: resourceContainer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.store.dispatch(new UpdateResourceContainer({resourceContainer: result}));
      }
    });

  }

  saveContainer(id: string) {
    const containerObj = this.containerService.getResourceContainerById(id);

    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(JSON.stringify(containerObj)));
    a.setAttribute('download', `${containerObj.title}.json`);
    a.click();
  }
}
