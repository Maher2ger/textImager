import {ProcessingResult} from './processing.result';

export interface AbstractProcessingElement {

  id: string;
  fileName: string;
  rawText: string;
  result: ProcessingResult;
}
