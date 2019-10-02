import {AbstractProcessingElement} from '../../domain/core/abstract.processing.element';
import {ResourceContainer} from '../../domain/core/resource.container';

export class ApplicationStateModel {

  resourceContainer: ResourceContainer[];
}

// Core Actions

export class ProcessStackTasks {
  static readonly type = '[Application] Process stack tasks (e.g. language detection)';
}

// Resource Containers

export class CreateNewResourceContainer {
  static readonly type = '[Application] Create new resource container';

  constructor(public payload: { title: string }) {
  }
}

export class UpdateResourceContainer {
  static readonly type = '[Application] Update resource container';

  constructor(public payload: { resourceContainer: ResourceContainer }) {
  }
}

export class RemoveResourceContainer {
  static readonly type = '[Application] Remove resource container';

  constructor(public payload: { id: string }) {
  }
}

export class ImportContainer {
  static readonly type = '[Application] Import resource container';

  constructor(public payload: { container: ResourceContainer }) {
  }
}

export class InitLanguageDetection {
  static readonly type = '[Application] Initialize language detection for container (e.g. on file change)';

  constructor(public payload: { id: string }) {
  }
}

export class StartLanguageDetection {
  static readonly type = '[Application] Start language detection for container to detect language';

  constructor(public payload: { id: string }) {
  }
}

export class InitContentProcessing {
  static readonly type = '[Application] Initialize processing countdown';

  constructor(public payload: { id: string }) {
  }
}

export class StartContentProcessing {
  static readonly type = '[Application] Start content processing';

  constructor(public payload: { id: string }) {
  }
}

// Processing Elements

export class CreateNewProcessingElement {
  static readonly type = '[Application] Create new processing element';

  constructor(public payload: { containerId: string, initialText: string, title: string }) {
  }
}

export class UpdateProcessingElement {
  static readonly type = '[Application] Update a processing element';

  constructor(public payload: { containerId: string, id: string, element: AbstractProcessingElement }) {
  }
}

export class RemoveProcessingElement {
  static readonly type = '[Application] Remove a processing element';

  constructor(public payload: { containerId: string, id: string }) {
  }
}

// Result View

export class ResultViewOpenAdHoc {
  static readonly type = '[Application] Open a processing element in the result view';

  constructor(public payload: { containerId: string, id: string }) {
  }
}

export class ResultViewCloseElement {
  static readonly type = '[Application] Close a processing element in the result view';

  constructor(public payload: { containerId: string, id: string }) {
  }
}
