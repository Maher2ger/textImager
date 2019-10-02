import {NlpConfiguration} from '../domain/core/nlp.configuration';
import {isNullOrUndefined} from 'util';
import {ResourceContainer} from '../domain/core/resource.container';

export class DefaultNlpConfiguration {

  public static defaultDetectionCountdown = 4;

  static getMinimalConfig(): NlpConfiguration {
    return {
      parser: null,
      sentiment: null,
      lemmatizer: 'MateLemmatizer',
      tokenizer: null,
      pos: null,
      ner: null,
      misc: null,
      time: null,
      ddc: null,
      deeplearning: null,
      disambiguation: null,
      morphology: null,
      similarity: null,
      wikify: null,
      paragraphSplitter: null,
    };
  }

  static getDefaultConfig(language: string): NlpConfiguration {
    return {
      parser: 'StanfordParser',
      sentiment: 'PolyglotSentiment',
      lemmatizer: 'MateLemmatizer',
      tokenizer: 'OpenNlpSegmenter',
      pos: 'StanfordPosTagger',
      ner: 'StanfordNameEntityRecogn',
      misc: 'Word2VecShortestPath',
      time: 'HeidelTime',
      ddc: 'FastTextDDC3',
      deeplearning: 'W2V',
      disambiguation: 'FastTextDisambig',
      morphology: 'PolyglotMorphology',
      similarity: 'WordNGramJaccardMeasure',
      wikify: 'IXAWikify',
      paragraphSplitter: 'ParagraphSplitter',
    };
  }

  static getBlankConfig(): NlpConfiguration {
    return {
      parser: null,
      sentiment: null,
      lemmatizer: null,
      tokenizer: null,
      pos: null,
      ner: null,
      misc: null,
      time: null,
      ddc: null,
      deeplearning: null,
      disambiguation: null,
      morphology: null,
      similarity: null,
      wikify: null,
      paragraphSplitter: null,
    };
  }

  static hasAnyConfig(container: ResourceContainer) {
    if (!isNullOrUndefined(container.nlpConfig)) {
      return this.noBlankConfig(container.nlpConfig);
    }

    return false;
  }

  static noBlankConfig(nlpConfig: NlpConfiguration) {
    return !isNullOrUndefined(nlpConfig.lemmatizer) || !isNullOrUndefined(nlpConfig.parser) || !isNullOrUndefined(nlpConfig.sentiment) || !isNullOrUndefined(nlpConfig.tokenizer);
  }
}
