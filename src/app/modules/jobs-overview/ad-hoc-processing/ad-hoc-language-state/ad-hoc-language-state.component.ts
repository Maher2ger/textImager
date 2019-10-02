import {Component, Input, OnInit} from '@angular/core';
import {ResourceContainer} from '../../../../domain/core/resource.container';
import {LanguageDetectionConfig} from '../../../../config/language.detection.config';

@Component({
  selector: 'app-ad-hoc-language-state',
  templateUrl: './ad-hoc-language-state.component.html',
  styleUrls: ['./ad-hoc-language-state.component.scss']
})
export class AdHocLanguageStateComponent implements OnInit {

  @Input() resourceContainer: ResourceContainer;

  defaultCountdown = LanguageDetectionConfig.defaultDetectionCountdown;

  constructor() {
  }

  ngOnInit() {
  }

  getCountDownValue() {
    return 100 - ((this.resourceContainer.languageCountdown / this.defaultCountdown) * 100);
  }
}
