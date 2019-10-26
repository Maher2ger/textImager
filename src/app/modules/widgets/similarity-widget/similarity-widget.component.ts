import {Component, Input, OnInit} from '@angular/core';
import {WidgetConfiguration} from '../../../domain/resources/widget.configuration.model';

@Component({
  selector: '[app-similarity-widget]',
  templateUrl: './similarity-widget.component.html',
  styleUrls: ['./similarity-widget.component.scss']
})
export class SimilarityWidgetComponent implements OnInit {
  @Input() widgetConfiguration: WidgetConfiguration;
  constructor() { }

  ngOnInit() {
  }

}
