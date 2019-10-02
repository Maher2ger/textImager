import {Injectable} from '@angular/core';
import {UrlHelperService} from '../../../shared/helpers/url.helper.service';
import {JsonApiService} from '../api/json.api.service';
import {Store} from '@ngxs/store';
import {forkJoin} from 'rxjs';
import {JobInfo} from '../../../domain/big-data/job.info';
import {AddJob} from '../../store/jobs.state.model';
import {JobsState} from '../../store/jobs.state';
import {AuthState} from '../../store/auth.state';
import {bigDataEndpoint} from '../../../config/global.configuration';

@Injectable({
  providedIn: 'root'
})
export class BigDataService {

  constructor(private apiService: JsonApiService, private store: Store) {
  }

  getJobInfo(jobId) {
    return this.apiService.get(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/jobInfo`, [['jobId', jobId]], []));
  }

  listJobDocuments(jobId, limit, page, search) {
    return this.apiService.get(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/listDocuments`, [['jobId', jobId], ['limit', limit], ['page', page], ['search', search]], []));
  }

  getDocument(jobId, documentId) {
    return this.apiService.text(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/document`, [['jobId', jobId], ['_id', documentId]], []));
  }

  listJobsOfSessions() {
    const session = this.store.selectSnapshot(AuthState.session);

    return this.apiService.get(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/listJobs`, [['session', session]], []));
  }

  cancelJob(jobId: string) {
    return this.apiService.get(UrlHelperService.buildPagedUrlWithFilters(`${bigDataEndpoint}/cancel`, [['jobId', jobId]], []));
  }

  //
  //

  resolveJobAndAdd(job: { jobId: string, jobInfo: { message: string, status: string, done: number, state: string, total: number } }) {
    forkJoin([this.getJobInfo(job.jobId)]).subscribe(
      (response: [JobInfo]) => {
        this.store.dispatch(new AddJob({job: this.buildNewJob(job, response)}));
      }
    );
  }

  private buildNewJob(job, response: [JobInfo]): any {
    return {
      jobId: job.jobId,
      documents: response[1],
      jobInfo: job.jobInfo
    };
  }

  getJobFromStore(jobId: any) {
    const jobs = this.store.selectSnapshot(JobsState.jobs);

    for (const job of jobs) {
      if (parseInt(job.jobId, 10) === parseInt(jobId, 10)) {
        return job;
      }
    }

    return null;
  }
}
