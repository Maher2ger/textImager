import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AddResultWidget,
  CloseResultWidget,
  OpenProcessingResult,
  ResetResultViewer,
  ResultsViewerStateModel,
  StartResultViewerLoading,
  ToggleTextRenderer,
  ToggleWidgetFullScreen,
  UpdateSelectedElements,
  UpdateWidgetDocuments,
  UpdateWidgetSize,
  UpdateWidgetTitle
} from './results-viewer.state.model';

@State<ResultsViewerStateModel>({
  name: 'results',
  defaults: {
    selectedElement: null,
    loading: false,
    textRenderer: false,
    selectedElements: [],
    widgets: []
  }
})
export class ResultsViewerState {

  @Selector()
  static highlightedElements(state: ResultsViewerStateModel) {
    return state.selectedElements;
  }

  @Selector()
  static loading(state: ResultsViewerStateModel) {
    return state.loading;
  }

  @Selector()
  static widgets(state: ResultsViewerStateModel) {
    return state.widgets;
  }

  /**
   * Application Core
   */

  @Action(ResetResultViewer)
  reset({patchState}: StateContext<ResultsViewerStateModel>) {
    patchState({
      selectedElement: null,
      selectedElements: [],
      loading: false,
      widgets: [],
      textRenderer: false
    });
  }

  @Action(ToggleTextRenderer)
  toggleText({getState, patchState}: StateContext<ResultsViewerStateModel>) {
    const current = getState();
    patchState({textRenderer: !current.textRenderer});
  }

  @Action(StartResultViewerLoading)
  startLoading({patchState}: StateContext<ResultsViewerStateModel>) {
    patchState({loading: true});
  }

  @Action(UpdateSelectedElements)
  updateHighlightedElements({patchState}: StateContext<ResultsViewerStateModel>, {payload: {elements}}: UpdateSelectedElements) {
    patchState({selectedElements: elements});
  }

  @Action(AddResultWidget)
  addWidget({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget}}: AddResultWidget) {
    const current = getState();

    current.widgets.push(widget);

    patchState({widgets: current.widgets});
  }

  @Action(CloseResultWidget)
  closeWidget({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget}}: CloseResultWidget) {
    const current = getState();

    for (let i = 0; i < current.widgets.length; i++) {
      if (current.widgets[i].id === widget.id) {
        current.widgets.splice(i, 1);
      }
    }

    patchState({widgets: current.widgets});
  }

  @Action(UpdateWidgetSize)
  updateWidgetSize({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget, size}}: UpdateWidgetSize) {
    const current = getState();

    for (let i = 0; i < current.widgets.length; i++) {
      if (current.widgets[i].id === widget.id) {
        current.widgets[i].size = size;
      }
    }

    patchState({widgets: current.widgets});
  }

  @Action(ToggleWidgetFullScreen)
  toggleWidgetFullscreen({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget}}: ToggleWidgetFullScreen) {
    const current = getState();

    for (let i = 0; i < current.widgets.length; i++) {
      if (current.widgets[i].id === widget.id) {
        const fullScreen = current.widgets[i].fullscreen;
        current.widgets[i].fullscreen = !fullScreen;

        if (!fullScreen) {
          current.widgets[i].size = 'XL';
        } else {
          current.widgets[i].size = 'L';
        }
      }
    }

    patchState({widgets: current.widgets});
  }

  @Action(UpdateWidgetTitle)
  updateWidgetTitle({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget, title}}: UpdateWidgetTitle) {
    const current = getState();

    for (let i = 0; i < current.widgets.length; i++) {
      if (current.widgets[i].id === widget.id) {
        current.widgets[i].name = title;
      }
    }

    patchState({widgets: current.widgets});
  }

  @Action(UpdateWidgetDocuments)
  updateWidgetDocuments({getState, patchState}: StateContext<ResultsViewerStateModel>, {payload: {widget}}: UpdateWidgetDocuments) {
    const current = getState();

    for (let i = 0; i < current.widgets.length; i++) {
      if (current.widgets[i].id === widget.id) {
        current.widgets[i].selectedProcessingElements = widget.selectedProcessingElements;
      }
    }

    patchState({widgets: current.widgets});
  }

  @Action(OpenProcessingResult)
  remove({patchState, getState}: StateContext<ResultsViewerStateModel>, {payload: {processingElement}}: OpenProcessingResult) {
    patchState({selectedElement: processingElement, loading: false});
  }
}
