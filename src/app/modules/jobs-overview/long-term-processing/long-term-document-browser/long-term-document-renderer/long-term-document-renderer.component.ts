import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {JobDocumentInfo} from '../../../../../domain/big-data/job.document.info';
import {Subscription} from 'rxjs';
import {BigDataService} from '../../../../../core/services/data/big.data.service';
import {Job} from '../../../../../domain/big-data/job';
import {DataService} from '../../../../../core/services/data/data.service';
import {ProcessingResult} from '../../../../../domain/core/processing.result';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-long-term-document-renderer',
  templateUrl: './long-term-document-renderer.component.html',
  styleUrls: ['./long-term-document-renderer.component.scss']
})
export class LongTermDocumentRendererComponent implements OnInit, OnChanges, OnDestroy {

  @Input() documentInfo: JobDocumentInfo;
  @Input() jobInfo: Job;

  documentDetails: string;

  showXml = false;
  parsedResult: ProcessingResult;

  loading = false;
  private subscription: Subscription;

  constructor(private bigDataService: BigDataService, private dataService: DataService) {
  }

  ngOnInit() {
    this.loadDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDetails();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadDetails() {
    this.loading = true;
    this.showXml = false;
    this.parsedResult = null;

    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.bigDataService.getDocument(this.jobInfo.jobId, this.documentInfo._id).subscribe(
      (data: string) => {
        this.documentDetails = data;
        this.parsedResult = this.dataService.parseResultFromJson(data, 'someId', 'type4', 'type2');
        this.loading = false;
      }
    );
  }
}
