import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngxs/store';
import {ResetResultViewer} from './state/results-viewer.state.model';

@Component({
  selector: 'app-results-viewer',
  templateUrl: './results-viewer.component.html',
  styleUrls: ['./results-viewer.component.scss']
})
export class ResultsViewerComponent implements OnInit {

  resultInfo: { type: string, id: string } = null;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new ResetResultViewer());
    this.resultInfo = this.activatedRoute.snapshot.data['info'];
  }
}
