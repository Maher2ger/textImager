import {Injectable} from '@angular/core';
import {JsonApiService} from '../api/json.api.service';
import {AbstractProcessingElement} from '../../../domain/core/abstract.processing.element';
import {restEndpoint} from '../../../config/global.configuration';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private jsonService: JsonApiService) {
  }

  processLanguage(documents: AbstractProcessingElement[]) {
    return this.jsonService.post(`${restEndpoint}/language`, this.buildFilesArray(documents));
  }

  private buildFilesArray(documents: AbstractProcessingElement[]) {
    const formData = new FormData();

    for (let i = 0; i < documents.length; i++) {
      formData.append(`file[${i}]`, new File([new Blob([documents[i].rawText])], documents[i].fileName));
    }

    return formData;
  }
}
