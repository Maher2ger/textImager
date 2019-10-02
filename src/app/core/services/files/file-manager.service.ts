import {Injectable} from '@angular/core';
import {JsonApiService} from '../api/json.api.service';
import {UrlHelperService} from '../../../shared/helpers/url.helper.service';
import {resourceEndpoint} from '../../../config/global.configuration';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private api: JsonApiService){
  }

  getFolders(node, session){
    return this.requestRepositories(node, session, false);
  }

  getFiles(node, session, sort: {direction: string, property: string}){
    return this.api.get(UrlHelperService.buildPagedUrlWithFilters(`${resourceEndpoint}/documents`, [['node', node], ['session', session], ['direction', sort.direction], ['property', sort.property]], []));
  }

  private requestRepositories(node, session, documents){
    return this.api.get(UrlHelperService.buildPagedUrlWithFilters(`${resourceEndpoint}/repositories`, [['node', node], ['session', session], ['documents', documents]], []));
  }

  deleteFile(uri: string, parent: string, session: string) {
    return this.api.delete(UrlHelperService.buildPagedUrlWithFilters(`${resourceEndpoint}/resource`, [['target', uri], ['session', session], ['parent', parent]], []));
  }
}
