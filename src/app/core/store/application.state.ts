import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  ApplicationStateModel,
  CreateNewProcessingElement,
  CreateNewResourceContainer,
  ImportContainer,
  InitContentProcessing,
  InitLanguageDetection,
  ProcessStackTasks,
  RemoveProcessingElement,
  RemoveResourceContainer,
  ResultViewCloseElement,
  ResultViewOpenAdHoc,
  StartContentProcessing,
  StartLanguageDetection,
  UpdateProcessingElement,
  UpdateResourceContainer
} from './application.state.model';
import {AbstractProcessingElement} from '../../domain/core/abstract.processing.element';
import {v4 as uuid} from 'uuid';
import {ResourceContainer} from '../../domain/core/resource.container';
import {isNullOrUndefined} from 'util';
import {LanguageDetectionConfig} from '../../config/language.detection.config';
import {LanguageHelperService} from '../../shared/helpers/language.helper.service';
import {DefaultNlpConfiguration} from '../../config/default.nlp.configuration';
import {NlpConfiguration} from '../../domain/core/nlp.configuration';
import {DataService} from '../services/data/data.service';
import {LanguageService} from '../services/language/language.service';
import {ProcessingService} from '../services/processing/processing.service';

@State<ApplicationStateModel>({
  name: 'application',
  defaults: {
    resourceContainer: []
  }
})
export class ApplicationState {

  constructor(private dataService: DataService, private languageService: LanguageService, private processingService: ProcessingService) {
  }

  @Selector()
  static resourceContainer(state: ApplicationStateModel) {
    return state.resourceContainer;
  }

  /**
   * Application Core
   */

  @Action(ProcessStackTasks)
  processStack({patchState, getState, dispatch}: StateContext<ApplicationStateModel>) {
    const current = getState();

    let state = null;

    state = this.checkLanguageProcessing(current, dispatch);
    state = this.checkProcessingContent(current, dispatch);

    patchState(state);
  }


  /**
   * Resource Container Actions
   */

  /**
   * Creates a new blank processing container that can hold texts
   */
  @Action(CreateNewResourceContainer)
  createResourceContainer({patchState, getState}: StateContext<ApplicationStateModel>, {payload: {title}}: CreateNewResourceContainer) {
    const current = getState();

    const resourceContainer = this.buildNewResourceContainer(title);
    current.resourceContainer.push(resourceContainer);

    patchState({resourceContainer: current.resourceContainer});
  }

  /**
   * Import a resource container
   */
  @Action(ImportContainer)
  importResourceContainer({patchState, getState}: StateContext<ApplicationStateModel>, {payload: {container}}: ImportContainer) {
    const current = getState();

    current.resourceContainer.push(container);

    patchState({resourceContainer: current.resourceContainer});
  }

  /**
   * Creates a new blank processing container that can hold texts
   */
  @Action(UpdateResourceContainer)
  updateResourceContainer({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {resourceContainer}}: UpdateResourceContainer) {
    patchState(this.updateContainer(getState(), resourceContainer, resourceContainer.id));
    dispatch(new InitContentProcessing({id: resourceContainer.id}));
  }

  /**
   * Remove a processing container with a certain id from the store
   * @param id
   */
  @Action(RemoveResourceContainer)
  removeResourceContainer({patchState, getState}: StateContext<ApplicationStateModel>, {payload: {id}}: RemoveResourceContainer) {
    const current = getState();

    for (let i = 0; i < current.resourceContainer.length; i++) {
      if (current.resourceContainer[i].id === id) {
        current.resourceContainer.splice(i, 1);
        break;
      }
    }

    patchState(current);
  }

  /**
   * Initialize the language detection countdown for a given container
   * @param id
   */
  @Action(InitLanguageDetection)
  initLanguageDetection({patchState, getState}: StateContext<ApplicationStateModel>, {payload: {id}}: InitLanguageDetection) {
    const resourceContainer = this.getResourceContainer(getState(), id);

    if (resourceContainer.processingElements && resourceContainer.processingElements.length > 0) {
      resourceContainer.languageCountdown = LanguageDetectionConfig.defaultDetectionCountdown;
    }

    patchState(this.updateContainer(getState(), resourceContainer, id));
  }

  /**
   * Start language processing for all elements within a resource container
   * @param id
   */
  @Action(StartLanguageDetection)
  startLanguageDetection({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id}}: StartLanguageDetection) {
    const state = getState();
    const resourceContainer = this.getResourceContainer(state, id);

    resourceContainer.languageProcessing = true;
    resourceContainer.dataProcessed = false;
    patchState(this.updateContainer(state, resourceContainer, id));

    this.languageService.processLanguage(resourceContainer.processingElements).subscribe(
      (languageResult) => {
        resourceContainer.languageProcessing = false;
        resourceContainer.languageProcessed = true;
        resourceContainer.languageCountdown = null;
        resourceContainer.language = LanguageHelperService.parseLanguage(languageResult);

        patchState(this.updateContainer(state, resourceContainer, id));
      },
      () => {
        resourceContainer.languageProcessing = false;
        patchState(this.updateContainer(state, resourceContainer, id));
        dispatch(new InitLanguageDetection({id: id}));
    });
  }

  @Action(InitContentProcessing)
  initProcessing({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id}}: InitContentProcessing) {
    const resourceContainer = this.getResourceContainer(getState(), id);

    if (resourceContainer.processingElements && resourceContainer.processingElements.length > 0 && resourceContainer.language) {
      resourceContainer.dataCountdown = DefaultNlpConfiguration.defaultDetectionCountdown;
    }

    patchState(this.updateContainer(getState(), resourceContainer, id));
  }


  @Action(StartContentProcessing)
  startProcessing({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id}}: StartContentProcessing) {
    const state = getState();
    const resourceContainer = this.getResourceContainer(state, id);

    resourceContainer.dataProcessing = true;
    resourceContainer.dataProcessed = false;
    patchState(this.updateContainer(state, resourceContainer, id));

    this.processingService.processMulti(resourceContainer).subscribe(
      (data) => {

        for (let i = 0; i < resourceContainer.processingElements.length; i++) {
          resourceContainer.processingElements[i].result = this.dataService.parseResultFromJson(data[i], resourceContainer.processingElements[i].id, 'type6', 'type4');
        }

        resourceContainer.dataProcessed = true;
        resourceContainer.dataProcessing = false;
        resourceContainer.dataCountdown = null;

        patchState(this.updateContainer(getState(), resourceContainer, id));
      },
      () => {
        dispatch(new InitContentProcessing({id: id}));
      }
    );
  }


  /**
   * Processing element actions
   */

  /**
   * Create a new processing element with an initial text and title (filename). Add it to the store with the given id
   * @param containerId
   * @param initialText
   * @param title
   */
  @Action(CreateNewProcessingElement)
  reload({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {containerId, initialText, title}}: CreateNewProcessingElement) {
    const resourceContainer = this.getResourceContainer(getState(), containerId);

    console.log(resourceContainer, initialText, title);

    resourceContainer.processingElements.push(this.buildNewProcessingElement(resourceContainer, initialText, title));
    dispatch(new InitLanguageDetection({id: resourceContainer.id}));

    patchState(this.updateContainer(getState(), resourceContainer, containerId));
  }

  /**
   * Update the processing element with the given id in the given resource container. Replace the element with the given element
   * @param id
   * @param element
   * @param containerId
   */
  @Action(UpdateProcessingElement)
  update({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id, element, containerId}}: UpdateProcessingElement) {
    const resourceContainer = this.getResourceContainer(getState(), containerId);

    console.log(id, element, containerId);

    for (let i = 0; i < resourceContainer.processingElements.length; i++) {
      if (resourceContainer.processingElements[i].id === id) {
        resourceContainer.processingElements[i] = element;
        break;
      }
    }

    resourceContainer.dataProcessed = false;
    resourceContainer.languageProcessed = false;
    dispatch(new InitLanguageDetection({id: resourceContainer.id}));

    patchState(this.updateContainer(getState(), resourceContainer, containerId));
  }

  /**
   * Remove the processing element with the given id from the given container
   * @param id
   * @param containerId
   */
  @Action(RemoveProcessingElement)
  remove({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id, containerId}}: RemoveProcessingElement) {
    const resourceContainer = this.getResourceContainer(getState(), containerId);

    for (let i = 0; i < resourceContainer.processingElements.length; i++) {
      if (resourceContainer.processingElements[i].id === id) {
        resourceContainer.processingElements.splice(i, 1);
        break;
      }
    }

    resourceContainer.languageProcessed = false;
    resourceContainer.dataProcessed = false;
    dispatch(new InitLanguageDetection({id: resourceContainer.id}));

    patchState(this.updateContainer(getState(), resourceContainer, containerId));
  }

  @Action(ResultViewOpenAdHoc)
  resultViewOpenElement({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id, containerId}}: ResultViewOpenAdHoc) {
    const resourceContainer = this.getResourceContainer(getState(), containerId);

    for (let i = 0; i < resourceContainer.processingElements.length; i++) {
      if (resourceContainer.processingElements[i].id === id) {
        if (this.isNotOpenYet(resourceContainer.selectedElements, id)) {
          resourceContainer.selectedElements.push(resourceContainer.processingElements[i]);
        }
        break;
      }
    }

    patchState(this.updateContainer(getState(), resourceContainer, containerId));
  }

  @Action(ResultViewCloseElement)
  resultViewCloseElement({patchState, getState, dispatch}: StateContext<ApplicationStateModel>, {payload: {id, containerId}}: ResultViewCloseElement) {
    const resourceContainer = this.getResourceContainer(getState(), containerId);

    for (let i = 0; i < resourceContainer.processingElements.length; i++) {
      if (resourceContainer.selectedElements[i].id === id) {
        resourceContainer.selectedElements.splice(i, 1);
        break;
      }
    }

    patchState(this.updateContainer(getState(), resourceContainer, containerId));
  }


  //
  // private methods

  private buildNewProcessingElement(current: ResourceContainer, initialText: string, title: string): AbstractProcessingElement {
    if (isNullOrUndefined(title)) {
      title = `Datei ${(current.processingElements.length + 1)}.txt`;
    }

    return {
      id: uuid(),
      fileName: title,
      rawText: initialText,
      result: null
    };
  }

  private buildNewResourceContainer(title: string): ResourceContainer {
    return {
      title: title,
      id: uuid(),
      nlpConfig: DefaultNlpConfiguration.getBlankConfig(),
      languageProcessed: false,
      languageProcessing: false,
      languageCountdown: null,
      language: null,
      selectedElements: [],
      dataProcessed: false,
      dataProcessing: false,
      dataCountdown: null,
      processingElements: []
    };
  }

  private getResourceContainer(state: ApplicationStateModel, containerId: string) {
    for (const container of state.resourceContainer) {
      if (container.id === containerId) {
        return container;
      }
    }

    return null;
  }

  private updateContainer(state: ApplicationStateModel, resourceContainer: ResourceContainer, containerId: string): ApplicationStateModel {
    for (let i = 0; i < state.resourceContainer.length; i++) {
      if (state.resourceContainer[i].id === containerId) {
        state.resourceContainer[i] = resourceContainer;
        break;
      }
    }

    return {
      resourceContainer: state.resourceContainer
    };
  }

  private checkLanguageProcessing(current: ApplicationStateModel, dispatch) {
    for (let i = 0; i < current.resourceContainer.length; i++) {
      if (current.resourceContainer[i].processingElements.length <= 0) {
        current.resourceContainer[i].languageCountdown = null;
        current.resourceContainer[i].languageProcessed = false;
        continue;
      }
      // if no language detected and no running language detection and countdown specified
      if (!current.resourceContainer[i].languageProcessed && !current.resourceContainer[i].languageProcessing && !isNullOrUndefined(current.resourceContainer[i].languageCountdown)) {
        // decrease countdown
        if (current.resourceContainer[i].languageCountdown > 0) {
          current.resourceContainer[i].languageCountdown = (current.resourceContainer[i].languageCountdown - 1);
          console.log('decrease counter: ' + current.resourceContainer[i].languageCountdown);
        }

        // Start processing
        if (current.resourceContainer[i].languageCountdown <= 0) {
          dispatch(new StartLanguageDetection({id: current.resourceContainer[i].id}));
        }
      }
    }

    return current;
  }

  private buildProcessingConfig(nlpConfig: NlpConfiguration): string {
    const result = [];

    if (!isNullOrUndefined(nlpConfig.sentiment)) {
      result.push(nlpConfig.sentiment);
    }

    if (!isNullOrUndefined(nlpConfig.lemmatizer)) {
      result.push(nlpConfig.lemmatizer);
    }

    if (!isNullOrUndefined(nlpConfig.parser)) {
      result.push(nlpConfig.parser);
    }

    if (!isNullOrUndefined(nlpConfig.tokenizer)) {
      result.push(nlpConfig.tokenizer);
    }

    return result.join(',');
  }

  private checkProcessingContent(current: ApplicationStateModel, dispatch) {
    for (let i = 0; i < current.resourceContainer.length; i++) {
      if (current.resourceContainer[i].processingElements.length <= 0 || isNullOrUndefined(current.resourceContainer[i].language) || isNullOrUndefined(current.resourceContainer[i].nlpConfig)) {
        current.resourceContainer[i].dataCountdown = null;
        current.resourceContainer[i].dataProcessed = false;
        continue;
      }
      // if no language detected and no running language detection and countdown specified
      if (!current.resourceContainer[i].dataProcessed && !current.resourceContainer[i].dataProcessing && !isNullOrUndefined(current.resourceContainer[i].dataCountdown)) {
        // decrease countdown
        if (current.resourceContainer[i].dataCountdown > 0) {
          current.resourceContainer[i].dataCountdown = (current.resourceContainer[i].dataCountdown - 1);
          console.log('decrease counter: ' + current.resourceContainer[i].dataCountdown);
        }

        // Start processing
        if (current.resourceContainer[i].dataCountdown <= 0 && !current.resourceContainer[i].dataProcessing) {
          dispatch(new StartContentProcessing({id: current.resourceContainer[i].id}));
        }
      }
    }

    return current;
  }

  private isNotOpenYet(selectedElements: AbstractProcessingElement[], id: string) {
    for(const element of selectedElements){
      if(element.id === id){
        return false;
      }
    }

    return true;
  }
}
