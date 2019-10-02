import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BigDataService} from '../../../../core/services/data/big.data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../../../domain/big-data/job';
import {NotificationsService} from '../../../../core/services/notifications/notifications.service';
import {isNullOrUndefined} from 'util';
import {JobDocumentInfo} from '../../../../domain/big-data/job.document.info';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-long-term-document-browser',
  templateUrl: './long-term-document-browser.component.html',
  styleUrls: ['./long-term-document-browser.component.scss']
})
export class LongTermDocumentBrowserComponent implements OnInit {

  job: Job = null;
  selectedDocument = null;

  loading = false;
  page = 0;
  limit = 10;

  search: string;
  searchChanged: Subject<string> = new Subject<string>();

  asyncMeals: Observable<{ documentId: string, _id: string }[]>;
  total: number;

  constructor(private bigDataService: BigDataService, private activatedRoute: ActivatedRoute, private router: Router, private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.job = this.bigDataService.getJobFromStore(this.activatedRoute.snapshot.params['jobId']);

    if (isNullOrUndefined(this.job)) {
      this.notificationService.generateException('Job konnte nicht gefunden werden');
      this.router.navigate(['/']);
    }

    this.searchChanged.pipe(debounceTime(750), distinctUntilChanged())
      .subscribe(search => {
        this.search = search;
        this.page = 0;
        this.getPage(this.page);
      });

    this.getPage(this.page);
  }


  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = this.bigDataService.listJobDocuments(this.job.jobId, this.limit, this.page, this.search)
      .pipe(tap((res: { documentIds: any[], page, total }) => {
        this.total = res.total;
        this.page = this.page + 1;
        this.loading = false;
      }), map(res => res.documentIds));
  }


  loadDetails(document: JobDocumentInfo) {
    this.selectedDocument = document;
  }

  searchChangeHandler(text: string) {
    (!!text) ? text = text : text = null;
    this.searchChanged.next(text);
  }
}
