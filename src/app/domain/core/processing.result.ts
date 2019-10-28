import {AbstractXmlNodeObject} from './abstract.xml.node.object';
import {AbstractXmlNodeTimeObject} from './abstract.xml.node.object';

export interface ProcessingResult {

  containerId: string;
  begin: number;
  end: number;
  sofa: string;

  paragraph: AbstractXmlNodeObject[];
  sentence: AbstractXmlNodeObject[];
  lemma: AbstractXmlNodeObject[];
  token: AbstractXmlNodeObject[];
  location: AbstractXmlNodeObject[];
  timex3: AbstractXmlNodeTimeObject[];
  similarity: AbstractXmlNodeObject[];
  person: AbstractXmlNodeObject[];
  organization: AbstractXmlNodeObject[];
  namedEntity: AbstractXmlNodeObject[];


}
