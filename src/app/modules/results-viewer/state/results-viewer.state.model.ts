import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';
import {AbstractXmlNodeObject} from '../../../domain/core/abstract.xml.node.object';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';

export class ResultsViewerStateModel {
  selectedElement: AbstractProcessingElement;
  loading: boolean;
  textRenderer: boolean;
  selectedElements: AbstractXmlNodeObject[];
  widgets: WidgetConfiguration[];
}

export class ResetResultViewer {
  static readonly type = '[Result Viewer] Reset Viewer';
}

export class StartResultViewerLoading {
  static readonly type = '[Result Viewer] Start Result Viewer Loading';
}

export class ToggleTextRenderer {
  static readonly type = '[Result Viewer] Toggle Text Renderer';
}

export class ToggleWidgetFullScreen {
  static readonly type = '[Result Viewer] Toggle Widget Full Screen';

  constructor(public payload: { widget: WidgetConfiguration }) {
  }
}

export class AddResultWidget {
  static readonly type = '[Result Viewer] Add New Widget';

  constructor(public payload: { widget: WidgetConfiguration }) {
  }
}

export class CloseResultWidget {
  static readonly type = '[Result Viewer] Close a Widget';

  constructor(public payload: { widget: WidgetConfiguration }) {
  }
}

export class UpdateWidgetSize {
  static readonly type = '[Result Viewer] Update the widgets size';

  constructor(public payload: { widget: WidgetConfiguration, size: string }) {
  }
}

export class UpdateWidgetTitle {
  static readonly type = '[Result Viewer] Update the widgets title';

  constructor(public payload: { widget: WidgetConfiguration, title: string }) {
  }
}

export class UpdateWidgetDocuments {
  static readonly type = '[Result Viewer] Update the widgets documents';

  constructor(public payload: { widget: WidgetConfiguration }) {
  }
}

export class UpdateSelectedElements {
  static readonly type = '[Result Viewer] Update selected Elements';

  constructor(public payload: { elements: AbstractXmlNodeObject[] }) {
  }
}

export class OpenProcessingResult {
  static readonly type = '[Result Viewer] Open Processing Element';

  constructor(public payload: { processingElement: AbstractProcessingElement }) {
  }
}

