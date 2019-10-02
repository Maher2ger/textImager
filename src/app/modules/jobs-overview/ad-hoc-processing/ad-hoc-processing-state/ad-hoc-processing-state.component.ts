import {Component, Input, OnInit} from '@angular/core';
import {ResourceContainer} from '../../../../domain/core/resource.container';
import {DefaultNlpConfiguration} from '../../../../config/default.nlp.configuration';

@Component({
  selector: 'app-ad-hoc-processing-state',
  templateUrl: './ad-hoc-processing-state.component.html',
  styleUrls: ['./ad-hoc-processing-state.component.scss']
})
export class AdHocProcessingStateComponent implements OnInit {

  @Input() resourceContainer: ResourceContainer;

  defaultCountdown = DefaultNlpConfiguration.defaultDetectionCountdown;

  constructor() {
  }

  ngOnInit() {
  }

  getCountDownValue() {
    return 100 - ((this.resourceContainer.dataCountdown / this.defaultCountdown) * 100);
  }
}
