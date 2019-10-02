import {Injectable} from '@angular/core';
import {JsonApiService} from '../api/json.api.service';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {NlpConfiguration} from '../../../domain/core/nlp.configuration';
import {bigDataEndpoint, restEndpoint} from '../../../config/global.configuration';

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  constructor(private jsonService: JsonApiService) {
  }

  processMulti(container: ResourceContainer) {
    return this.jsonService.post(this.buildUrl(`${restEndpoint}/process`, container), this.buildFilesArray(container.processingElements));
  }

  createJobFromFiles(files, language, session, inputFormat, fileSuffix, pipeline) {
    return this.jsonService.postFiles(this.buildAnalysePipeline(`${bigDataEndpoint}/analyse?language=${language}&session=${session}&inputFormat=${inputFormat}&fileSuffix=${fileSuffix}`, pipeline), files);
  }

  createJobFromUrl(url, language, session, inputFormat, fileSuffix, pipeline) {
    return this.jsonService.post(this.buildAnalysePipeline(`${bigDataEndpoint}/analyse?language=${language}&session=${session}&inputFormat=${inputFormat}&fileSuffix=${fileSuffix}&url=${url}`, pipeline), {});
  }

  private buildFilesArray(documents: AbstractProcessingElement[]) {
    const formData = new FormData();

    for (let i = 0; i < documents.length; i++) {
      formData.append(`file[${i}]`, new File([new Blob([documents[i].rawText])], documents[i].fileName));
    }

    return formData;
  }

  private appendLanguageToUrl(url: string, container: ResourceContainer) {
    return this.appendPipeline(url + '?language=' + container.language, container);
  }

  private appendPipeline(url: string, container: ResourceContainer) {
    if (container.nlpConfig.parser) {
      url = url + '&pipeline=' + container.nlpConfig.parser;
    }

    if (container.nlpConfig.tokenizer) {
      url = url + '&pipeline=' + container.nlpConfig.tokenizer;
    }

    if (container.nlpConfig.lemmatizer) {
      url = url + '&pipeline=' + container.nlpConfig.lemmatizer;
    }

    if (container.nlpConfig.sentiment) {
      url = url + '&pipeline=' + container.nlpConfig.sentiment;
    }

    return this.appendOutputFormat(url);
  }

  private appendOutputFormat(url: string) {
    return url + '&outputFormat=XMI';
  }

  private buildUrl(url: string, container: ResourceContainer) {
    return this.appendLanguageToUrl(url, container);
  }

  private buildAnalysePipeline(url, config: NlpConfiguration) {
    if (config.parser) {
      url = url + '&pipeline=' + config.parser;
    }

    if (config.tokenizer) {
      url = url + '&pipeline=' + config.tokenizer;
    }

    if (config.lemmatizer) {
      url = url + '&pipeline=' + config.lemmatizer;
    }

    if (config.sentiment) {
      url = url + '&pipeline=' + config.sentiment;
    }

    return url;
  }
}
