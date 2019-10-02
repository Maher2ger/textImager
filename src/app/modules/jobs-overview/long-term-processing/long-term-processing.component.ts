import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../domain/big-data/job';
import {BigDataService} from '../../../core/services/data/big.data.service';
import {Actions, Store} from '@ngxs/store';
import {RemoveJob} from '../../../core/store/jobs.state.model';

@Component({
  selector: 'app-long-term-processing',
  templateUrl: './long-term-processing.component.html',
  styleUrls: ['./long-term-processing.component.scss']
})
export class LongTermProcessingComponent implements OnInit {

  @Input() jobContainer: Job;

  disabled = false;

  constructor(private bigDataService: BigDataService, private actions: Actions, private store: Store) {
  }

  ngOnInit() {
  }

  cancelProcessing(container: Job) {
    this.disabled = true;

    this.bigDataService.cancelJob(container.jobId).subscribe(
      () => {
        this.store.dispatch(new RemoveJob({jobId: this.jobContainer.jobId}));
      }
    );
  }

  removeContainer() {
    this.store.dispatch(new RemoveJob({jobId: this.jobContainer.jobId}));
  }
}
