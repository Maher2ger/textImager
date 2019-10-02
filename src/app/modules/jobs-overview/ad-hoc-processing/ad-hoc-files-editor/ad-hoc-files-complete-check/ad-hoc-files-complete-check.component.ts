import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {ApplicationState} from '../../../../../core/store/application.state';
import {ResourceContainer} from '../../../../../domain/core/resource.container';
import {ActivatedRoute} from '@angular/router';
import {
  CreateNewProcessingElement,
  RemoveProcessingElement,
  UpdateProcessingElement
} from '../../../../../core/store/application.state.model';
import {ResourceContainerService} from '../../../../../core/services/common/resource.container.service';

@Component({
  selector: 'app-ad-hoc-files-complete-check',
  templateUrl: './ad-hoc-files-complete-check.component.html',
  styleUrls: ['./ad-hoc-files-complete-check.component.scss']
})
export class AdHocFilesCompleteCheckComponent implements OnInit {

  @Output() startLanguageProcessing = new EventEmitter();

  noEmptyFiles = false;

  constructor(private activatedRoute: ActivatedRoute, private store: Store, private actions: Actions, private containerService: ResourceContainerService) {
  }

  ngOnInit() {
    this.checkCompleteness(this.store.selectSnapshot(ApplicationState.resourceContainer));

    this.actions.pipe(ofActionDispatched(UpdateProcessingElement, RemoveProcessingElement, CreateNewProcessingElement)).subscribe(
      () => {
        this.checkCompleteness(this.store.selectSnapshot(ApplicationState.resourceContainer));
      }
    );
  }

  private checkCompleteness(container: ResourceContainer[]) {
    this.noEmptyFiles = true;
    let activeContainer = null;

    for (const element of container) {
      if (element.id === this.activatedRoute.snapshot.params['containerId']) {
        activeContainer = element;
        break;
      }
    }

    if (!activeContainer) {
      return;
    }

    for (const processingElement of activeContainer.processingElements) {
      if (!processingElement.rawText) {
        this.noEmptyFiles = false;
        break;
      }
    }
  }

  removeEmptyFiles() {
    const containerId = this.activatedRoute.snapshot.params['containerId'];
    const elements = this.containerService.getResourceContainerById(containerId).processingElements;

    for (const element of elements) {
      if (!element.rawText) {
        this.store.dispatch(new RemoveProcessingElement({containerId: containerId, id: element.id}));
      }
    }
  }
}
