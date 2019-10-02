import {Injectable} from '@angular/core';
import {JsonApiService} from '../api/json.api.service';
import {Md5} from 'ts-md5/dist/md5';
import {UrlHelperService} from '../../../shared/helpers/url.helper.service';
import {authorityEndpoint} from '../../../config/global.configuration';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: JsonApiService) {
  }

  login(username: string, password: string) {
    return this.apiService.post(UrlHelperService.buildPagedUrlWithFilters(`${authorityEndpoint}/login`, [['username', username], ['password', this.md5(password)]], []), {});
  }

  register(name: string, firstName: string, affiliation: string, email: string, reason: string, noncommercial: string) {
    return this.apiService.post(`${authorityEndpoint}/register`, {
      name: name,
      firstName: firstName,
      affiliation: affiliation,
      email: email,
      reasonforregistration: reason,
      noncommercial: noncommercial
    });
  }

  private md5(password: string) {
    return Md5.hashStr(password);
  }
}
