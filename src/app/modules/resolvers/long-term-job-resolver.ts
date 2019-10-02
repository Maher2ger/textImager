import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class LongTermJobResolver implements Resolve<Observable<any>> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return of({
      id: route.paramMap.get('jobId'),
      type: 'LONG_TERM',
    });
  }
}
