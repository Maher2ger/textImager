import {Injectable} from '@angular/core';
import {ProcessingResult} from '../../../domain/core/processing.result';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  parseResultFromJson(xmlResponse, id, tokenPrefix, metadataPrefix) {
    const parser = new DOMParser();

    const xmlDocument = parser.parseFromString(xmlResponse, 'text/xml');

    console.log(xmlDocument);

    let processingResult = this.buildEmptyProcessingResult(0, 0, id);

    processingResult = this.addResultsForTagNew(tokenPrefix + ':Sentence', 'sentence', processingResult, xmlDocument);
    processingResult = this.addResultsForTagNew(tokenPrefix + ':Paragraph', 'paragraph', processingResult, xmlDocument);
    processingResult = this.addResultsForTagNew(tokenPrefix + ':Lemma', 'lemma', processingResult, xmlDocument);
    processingResult = this.addResultsForTagNew(tokenPrefix + ':Token', 'token', processingResult, xmlDocument);
    processingResult = this.addResultsForTagNew(tokenPrefix + ':Location', 'location', processingResult, xmlDocument);

    const sofas = xmlDocument.getElementsByTagName('cas:Sofa');

    // processingResult.sofa =
    if (sofas.length > 0) {
      console.log(sofas);
      processingResult.sofa = sofas[0]['attributes']['sofaString']['value'];
    } else {
      // error in the document, remove it from result;
    }

    console.log(processingResult);

    return processingResult;
  }

  parseMetadataFromJson(xmlResponse) {
    const parser = new DOMParser();

    const xmlDocument = parser.parseFromString(xmlResponse, 'text/xml');

    return {
      id: xmlDocument.getElementsByTagName('type2:DocumentMetaData')[0]['attributes']['documentId']['value'],
      fileName: xmlDocument.getElementsByTagName('type2:DocumentMetaData')[0]['attributes']['documentTitle']['value']
    };
  }

  private addResultsForTagNew(tag: string, attr: string, processingResult: ProcessingResult, xmlDocument) {
    for (const xmlNode of this.getTagsNew(xmlDocument, tag)) {
      processingResult[attr].push(this.buildAbstractNode(xmlNode));
    }

    return processingResult;
  }


  getTagsNew(xmlDocument: any, tag: string) {
    return xmlDocument.getElementsByTagName(tag);
  }

  getSubStrFromCompleteTextByBeginAndEnd(begin: number, end: number, completeText) {
    return completeText.substr(parseInt(begin + '', 10), (parseInt(end + '', 10) - parseInt(begin + '', 10)));
  }

  getSentenceAsValueArray(begin: number, end: number, processingElement: AbstractProcessingElement, completeText) {
    const result = [];
    const text = completeText.substr(parseInt(begin + '', 10), (parseInt(end + '', 10) - parseInt(begin + '', 10)));

    result.push(text);

    return result;
  }

  //
  // private methods

  private buildEmptyProcessingResult(begin: number, end: number, id: string) {
    return {
      containerId: id,
      begin: begin,
      end: end,
      sofa: '',
      paragraph: [],
      sentence: [],
      lemma: [],
      token: [],
      location: []
    };
  }

  private buildAbstractNode(xmlNode: any) {
    return {
      begin: (xmlNode['attributes']['begin']) ? parseInt(xmlNode['attributes']['begin']['value'], 10) : null,
      end: (xmlNode['attributes']['end']) ? parseInt(xmlNode['attributes']['end']['value'], 10) : null,
      value: (xmlNode['attributes']['value']) ? xmlNode['attributes']['value']['value'] : null,
      sofa: (xmlNode['attributes']['sofa']) ? parseInt(xmlNode['attributes']['sofa']['value'], 10) : null,
      id: (xmlNode['attributes']['id']) ? parseInt(xmlNode['attributes']['id']['value'], 10) : null,
    };
  }
}
