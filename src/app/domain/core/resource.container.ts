import {AbstractProcessingElement} from './abstract.processing.element';
import {NlpConfiguration} from './nlp.configuration';

export interface ResourceContainer {
  id: string;
  title: string;
  languageProcessed: boolean;
  languageProcessing: boolean;
  languageCountdown: number;
  language: string;
  dataProcessed: boolean;
  dataProcessing: boolean;
  dataCountdown: number;
  selectedElements: AbstractProcessingElement[];
  nlpConfig: NlpConfiguration;
  processingElements: AbstractProcessingElement[];
}
