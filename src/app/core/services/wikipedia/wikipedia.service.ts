import {Injectable} from '@angular/core';
import {JsonApiService} from '../api/json.api.service';
import {from, Observable} from 'rxjs';
import {UrlHelperService} from '../../../shared/helpers/url.helper.service';
import {WikipediaRandomIdResponse} from '../../../domain/wikipedia/wikipedia.random.id.response';
import {environment} from '../../../../environments/environment';
import {WikipediaPageResponse} from '../../../domain/wikipedia/wikipedia.page.response';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private _api: JsonApiService) {
  }

  //
  // api requests

  getRandomText(): Observable<string> {
    return from(new Promise(((resolve, reject) => {
      this.getRandomWikiPageId().subscribe(
        (data: WikipediaRandomIdResponse) => {
          const randomPageIdFromWikipedia = this.getPageIdFromRandomPageResponse(data);

          this.getRandomWikiPageContent(randomPageIdFromWikipedia).subscribe(
            (response: WikipediaPageResponse) => {
              const clearText = this.removeUnusedChars(response.query.pages[randomPageIdFromWikipedia].extract);

              resolve(clearText);
            },
            (error) => reject(error)
          );
        },
        (error) => reject(error)
      );
    })));
  }

  //
  // private methods

  private getRandomWikiPageId(): Observable<any> {
    return this._api.get(UrlHelperService.buildPagedUrlWithFilters(environment.mediaWikiEndpoint, [
      ['action', 'query'],
      ['generator', 'random'],
      ['format', 'json'],
      ['origin', '*']
    ], null));
  }

  private getRandomWikiPageContent(pageId: number): Observable<any> {
    return this._api.get(UrlHelperService.buildPagedUrlWithFilters(environment.mediaWikiEndpoint, [
      ['action', 'query'],
      ['format', 'json'],
      ['prop', 'extracts'],
      ['pageids', pageId],
      ['redirects'],
      ['origin', '*']
    ], ['explaintext']));
  }

  private getPageIdFromRandomPageResponse(response: WikipediaRandomIdResponse): number {
    const propertyList = Object.getOwnPropertyNames(response.query.pages);

    if (propertyList.length <= 0) {
      return null;
    }

    return parseInt(Object.getOwnPropertyNames(response.query.pages)[0], 10);
  }

  private removeUnusedChars(extract: string) {
    return ((extract.replace(/==(.*?)==/g, '')).replace(/\n\s*\n/g, '\n')).trim();
  }
}
