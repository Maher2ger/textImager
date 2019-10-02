import {isNullOrUndefined} from 'util';

export class UrlHelperService {

  static buildPagedUrlWithFilters(url, queryArgs, singleAttrs) {
    const queryParts = [];

    for (const queryArg of queryArgs) {
      if (!isNullOrUndefined(queryArg[1])) {
        queryParts.push(queryArg[0] + '=' + queryArg[1]);
      }
    }

    if (isNullOrUndefined(singleAttrs)) {
      singleAttrs = [];
    }

    return encodeURI(url + ('?') + queryParts.join('&') + ((singleAttrs.length > 0) ? '&' : '') + singleAttrs.join('&'));
  }
}
