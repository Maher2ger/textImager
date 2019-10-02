import {ProcessingResult} from '../core/processing.result';

export interface JobProcessingElement {

  jobId: string;
  documentId: string;
  _id: string;
  loading: boolean;
  loaded: boolean;
  xml: any;
  json: ProcessingResult;

}
