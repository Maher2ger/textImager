import {Component, OnInit} from '@angular/core';
import {ResourceContainerService} from '../../../../core/services/common/resource.container.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceContainer} from '../../../../domain/core/resource.container';
import {isNullOrUndefined} from 'util';
import {NotificationsService} from '../../../../core/services/notifications/notifications.service';
import {AbstractProcessingElement} from '../../../../domain/core/abstract.processing.element';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {
  CreateNewProcessingElement,
  RemoveProcessingElement,
  StartLanguageDetection,
  UpdateProcessingElement
} from '../../../../core/store/application.state.model';
import {WikipediaService} from '../../../../core/services/wikipedia/wikipedia.service';

@Component({
  selector: 'app-ad-hoc-files-editor',
  templateUrl: './ad-hoc-files-editor.component.html',
  styleUrls: ['./ad-hoc-files-editor.component.scss']
})
export class AdHocFilesEditorComponent implements OnInit {

  container: ResourceContainer;

  loading = false;

  languageProcessing = false;

  selectedProcessingElement: AbstractProcessingElement = null;

  constructor(private containerService: ResourceContainerService, private activatedRoute: ActivatedRoute, private notificationService: NotificationsService, private router: Router, private store: Store, private wikiService: WikipediaService, private actions: Actions) {
  }

  ngOnInit() {
    const container = this.containerService.getResourceContainerById(this.activatedRoute.snapshot.params['containerId']);

    if (isNullOrUndefined(container)) {
      this.notificationService.generateException('Diese Auswertung existiert nicht');
      this.router.navigate(['/']);
    }

    this.container = container;

    this.actions.pipe(ofActionDispatched(RemoveProcessingElement)).subscribe(() => this.selectedProcessingElement = null);
    this.actions.pipe(ofActionDispatched(UpdateProcessingElement)).subscribe(() => this.refreshContainer());
    this.actions.pipe(ofActionDispatched(StartLanguageDetection)).subscribe(() => this.refreshContainer());
  }

  selectElement(processingElement: AbstractProcessingElement) {
    this.selectedProcessingElement = processingElement;
  }

  addProcessingElement() {
    this.store.dispatch(new CreateNewProcessingElement({
      initialText: null,
      containerId: this.container.id,
      title: null
    }));
  }

  loadRandomPageContent() {
    this.loading = true;

    this.wikiService.getRandomText().subscribe(
      (response: string) => {
        // Sometimes you will get empty results from this api, if that happens just call the method again.
        if (!response) {
          this.loadRandomPageContent();
        } else {
          this.store.dispatch(new CreateNewProcessingElement({
            containerId: this.container.id,
            initialText: response,
            title: 'Wikipedia.txt'
          }));
          this.loading = false;
        }
      },
      () => {
        this.loading = false;
      }
    );

  }

  private refreshContainer() {
    this.container = this.containerService.getResourceContainerById(this.activatedRoute.snapshot.params['containerId']);
  }

  loadExampleContent() {
    this.containerService.addExamplesToContainer(this.container.id);
  }
}
