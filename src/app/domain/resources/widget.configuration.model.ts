import {AbstractProcessingElement} from '../core/abstract.processing.element';

export interface WidgetConfiguration {
  id: string;
  key: string;
  name: string;
  text: string;
  icon: string;
  size: string;
  sizesAvailable: string[];
  mode: string;
  ready: boolean;
  documentsNeeded: number;
  fullscreen: boolean;
  selectedProcessingElements: AbstractProcessingElement[];
}
