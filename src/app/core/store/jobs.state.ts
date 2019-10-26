import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AddDocumentSelection,
  AddJob,
  ClearSelection,
  CloseDocumentSelection,
  CloseElementForRender,
  JobsStateModel,
  OpenElementForRender,
  RemoveJob,
  ResolveJobProcessingElement
} from './jobs.state.model';
import {isNullOrUndefined} from 'util';
import {JobProcessingElement} from '../../domain/big-data/job.processing.element';
import {JsonApiService} from '../services/api/json.api.service';
import {UrlHelperService} from '../../shared/helpers/url.helper.service';
import {DataService} from '../services/data/data.service';
import {bigDataEndpoint} from '../../config/global.configuration';

@State<JobsStateModel>({
  name: 'jobs',
  defaults: {
    jobs: [],
    selectedDocuments: [],
    renderedElement: null
  }
})
export class JobsState {

  constructor(private apiService: JsonApiService, private dataService: DataService) {
  }

  @Selector()
  static jobs(state: JobsStateModel) {
    return state.jobs;
  }

  @Selector()
  static selectedDocuments(state: JobsStateModel) {
    return state.selectedDocuments;
  }

  @Selector()
  static renderedElement(state: JobsStateModel) {
    return state.renderedElement;
  }

  /**
   * Application Core
   */

  @Action(AddJob)
  logout({patchState, getState}: StateContext<JobsStateModel>, {payload: {job}}: AddJob) {
    const current = getState();

    let found = false;

    for (let i = 0; i < current.jobs.length; i++) {
      if (current.jobs[i].jobId === job.jobId) {
        current.jobs[i] = job;
        found = true;
      }
    }

    if (!found) {
      current.jobs.push(job);
    }

    patchState(current);
  }

  @Action(RemoveJob)
  remove({patchState, getState}: StateContext<JobsStateModel>, {payload: {jobId}}: RemoveJob) {
    const current = getState();

    for (let i = 0; i < current.jobs.length; i++) {
      if (current.jobs[i].jobId === jobId) {
        current.jobs.splice(i, 1);
      }
    }

    patchState(current);
  }

  @Action(ClearSelection)
  clearSelection({patchState}: StateContext<JobsStateModel>) {
    patchState({selectedDocuments: []});
  }

  @Action(AddDocumentSelection)
  addDocumentToSelection({patchState, getState}: StateContext<JobsStateModel>, {payload: {documentId, jobId, _id}}: AddDocumentSelection) {
    const current = getState();

    const elements = current.selectedDocuments;
    elements.push(this.buildUnprocessedElement(documentId, jobId, _id));

    patchState({selectedDocuments: elements});
  }

  @Action(CloseDocumentSelection)
  removeDocumentToSelection({patchState, getState}: StateContext<JobsStateModel>, {payload: {documentId, jobId, _id}}: CloseDocumentSelection) {
    const current = getState();

    for (let i = 0; i < current.selectedDocuments.length; i++) {
      if (current.selectedDocuments[i]._id === _id && current.selectedDocuments[i].jobId === jobId) {
        current.selectedDocuments.splice(i, 1);
      }
    }

    patchState(current);
  }

  @Action(ResolveJobProcessingElement)
  resolveDocument({patchState, getState}: StateContext<JobsStateModel>, {payload: {_id}}: ResolveJobProcessingElement) {
    const current = getState();
    let element: JobProcessingElement = null;

    for (let i = 0; i < current.selectedDocuments.length; i++) {
      if (current.selectedDocuments[i]._id === _id && !current.selectedDocuments[i].loaded && !current.selectedDocuments[i].loading) {
        element = current.selectedDocuments[i];
        current.selectedDocuments[i].loading = true;
        break;
      }
    }

    patchState(current);

    if (!isNullOrUndefined(element)) {
      this.apiService.text(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/document`, [['jobId', element.jobId], ['_id', element._id]], [])).subscribe(
        (data) => {

          for (let i = 0; i < current.selectedDocuments.length; i++) {
            if (current.selectedDocuments[i]._id === _id) {
              current.selectedDocuments[i].xml = data;
              current.selectedDocuments[i].json = this.resolveTokens(this.dataService.parseResultFromJson(data, _id, 'type4', 'type2'));
              current.selectedDocuments[i].loading = false;
              current.selectedDocuments[i].loaded = true;
              break;
            }
          }

          patchState(current);
        }
      );
    }
  }

  @Action(OpenElementForRender)
  openRenderElement({patchState}: StateContext<JobsStateModel>, {payload: {processingElement}}: OpenElementForRender) {
    patchState({renderedElement: processingElement});
  }

  @Action(CloseElementForRender)
  closeRenderElement({patchState}: StateContext<JobsStateModel>) {
    patchState({renderedElement: null});
  }

  private buildUnprocessedElement(documentId, jobId, _id) {
    return {
      jobId: jobId,
      _id: _id,
      documentId: documentId,
      loading: false,
      loaded: false,
      xml: null,
      json: null,
    };
  }

  private resolveTokens(parseResultFromJson:
                            { containerId: string;
                            begin: number;
                            end: number;
                            sofa: string;
                            paragraph: any[];
                            sentence: any[];
                            lemma: any[];
                            token: any[];
                            location: any[];
                            timex3: any[];
                            similarity: any[]; }) {
    for (let i = 0; i < parseResultFromJson.token.length; i++) {
      parseResultFromJson.token[i].value = parseResultFromJson.sofa.substr(parseResultFromJson.token[i].begin, parseResultFromJson.token[i].end);
    }

    return parseResultFromJson;
  }
}
