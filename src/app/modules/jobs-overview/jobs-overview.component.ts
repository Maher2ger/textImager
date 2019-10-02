import {Component, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {ApplicationState} from '../../core/store/application.state';
import {Observable} from 'rxjs';
import {ResourceContainer} from '../../domain/core/resource.container';
import {WikipediaService} from '../../core/services/wikipedia/wikipedia.service';
import {CreateNewResourceContainer, ImportContainer} from '../../core/store/application.state.model';
import {JobsState} from '../../core/store/jobs.state';
import {Job} from '../../domain/big-data/job';
import {AuthState} from '../../core/store/auth.state';
import {LoginSuccess} from '../../core/store/auth.state.model';
import {BigDataService} from '../../core/services/data/big.data.service';

@Component({
  selector: 'app-container-list',
  templateUrl: './jobs-overview.component.html',
  styleUrls: ['./jobs-overview.component.scss']
})
export class JobsOverviewComponent implements OnInit {

  @Select(ApplicationState.resourceContainer) resourceContainer$: Observable<ResourceContainer[]>;
  @Select(AuthState.authenticated) authenticated$: Observable<boolean>;
  @Select(JobsState.jobs) jobs$: Observable<Job[]>;

  loadingJobs = false;
  refreshing = false;

  constructor(private wikiService: WikipediaService, private bigDataService: BigDataService, private store: Store, private actions: Actions) {
  }

  ngOnInit(): void {
    this.actions.pipe(ofActionDispatched(LoginSuccess)).subscribe(
      () => {
        this.loadJobs();
      }
    );
  }

  addContainer() {
    const containers = this.store.selectSnapshot(ApplicationState.resourceContainer);
    this.store.dispatch(new CreateNewResourceContainer({title: 'Auswertung ' + (containers.length + 1)}));
  }

  import(event) {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    const self = this;

    function onReaderLoad(event) {
      const json = JSON.parse(event.target.result);
      self.store.dispatch(new ImportContainer({container: json}));
      event.target.clear();
    }
  }

  refresh() {
    this.refreshing = true;

    this.loadJobs();
  }

  private loadJobs() {
    this.loadingJobs = true;

    this.bigDataService.listJobsOfSessions().subscribe(
      (data: { jobId: string, jobInfo: { message: string, status: string, done: number, state: string, total: number } }[]) => {
        for (const job of data) {
          if (parseInt(job.jobId, 10) > -1 && job.jobInfo.message !== 'Job not found.') {
            this.bigDataService.resolveJobAndAdd(job);
          }
        }
        this.refreshing = false;
        this.loadingJobs = false;
      }
    );

  }
}
