import {Job} from '../../domain/big-data/job';
import {JobProcessingElement} from '../../domain/big-data/job.processing.element';

export class JobsStateModel {

  jobs: Job[];
  selectedDocuments: JobProcessingElement[];

  renderedElement: JobProcessingElement;

}

export class AddJob {
  static readonly type = '[Jobs] Add job to collection';

  constructor(public payload: { job: Job }) {
  }
}

export class RemoveJob {
  static readonly type = '[Jobs] Remove job from collection';

  constructor(public payload: { jobId: string }) {
  }
}

export class RefreshJob {
  static readonly type = '[Jobs] Refresh job from collection';

  constructor(public payload: { job: Job }) {
  }
}

export class ClearSelection {
  static readonly type = '[Jobs] Clear result view selections';
}

export class AddDocumentSelection {
  static readonly type = '[Jobs] Clear result view document selections';

  constructor(public payload: { documentId: string, _id: string, jobId: string }) {
  }
}

export class CloseDocumentSelection {
  static readonly type = '[Jobs] Close element result view selections';

  constructor(public payload: { documentId: string, _id: string, jobId: string }) {
  }
}

export class ResolveJobProcessingElement {
  static readonly type = '[Jobs] Resolve a job processing element';

  constructor(public payload: { _id: string }) {
  }
}


export class OpenElementForRender {
  static readonly type = '[Jobs] Open a job processing element';

  constructor(public payload: { processingElement: JobProcessingElement }) {
  }
}

export class CloseElementForRender {
  static readonly type = '[Jobs] close a rendered job processing element';
}
