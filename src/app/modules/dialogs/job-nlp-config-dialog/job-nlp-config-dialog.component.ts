import {Component, Inject, OnInit} from '@angular/core';
import {ResourceContainer} from '../../../domain/core/resource.container';
import {NlpConfiguration} from '../../../domain/core/nlp.configuration';
import {isNullOrUndefined} from 'util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-job-nlp-config-dialog',
  templateUrl: './job-nlp-config-dialog.component.html',
  styleUrls: ['./job-nlp-config-dialog.component.scss']
})
export class JobNlpConfigDialogComponent implements OnInit {

  resourceContainer: ResourceContainer;

  nlpConfig: NlpConfiguration = {
    lemmatizer: null,
    tokenizer: null,
    sentiment: null,
    parser: null,
    pos: null,
    ner: null,
    misc:  null,
    time:  null,
    ddc:  null,
    deeplearning: null,
    disambiguation:  null,
    morphology:  null,
    similarity:  null,
    wikify:  null,
    paragraphSplitter: null,
  };

  constructor(private ref: MatDialogRef<JobNlpConfigDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { resourceContainer: ResourceContainer }) {
    this.resourceContainer = data.resourceContainer;
  }

  ngOnInit() {
    this.parseExistingConfig();
  }

  updateNlpConfig(event) {

  }

  close() {
    this.resourceContainer.nlpConfig = this.nlpConfig;
    this.ref.close(this.resourceContainer);
  }

  private parseExistingConfig() {
    if (!isNullOrUndefined(this.resourceContainer.nlpConfig)) {
      this.nlpConfig.lemmatizer = this.resourceContainer.nlpConfig.lemmatizer;
      this.nlpConfig.tokenizer = this.resourceContainer.nlpConfig.tokenizer;
      this.nlpConfig.sentiment = this.resourceContainer.nlpConfig.sentiment;
      this.nlpConfig.parser = this.resourceContainer.nlpConfig.parser;
      this.nlpConfig.ner = this.resourceContainer.nlpConfig.ner;
      this.nlpConfig.misc = this.resourceContainer.nlpConfig.misc;
      this.nlpConfig.time = this.resourceContainer.nlpConfig.time;
      this.nlpConfig.ddc = this.resourceContainer.nlpConfig.ddc;
      this.nlpConfig.deeplearning = this.resourceContainer.nlpConfig.deeplearning;
      this.nlpConfig.morphology = this.resourceContainer.nlpConfig.morphology;
      this.nlpConfig.similarity = this.resourceContainer.nlpConfig.similarity;
      this.nlpConfig.wikify = this.resourceContainer.nlpConfig.wikify;
      this.nlpConfig.paragraphSplitter= this.resourceContainer.nlpConfig.paragraphSplitter;
    }
  }
}
