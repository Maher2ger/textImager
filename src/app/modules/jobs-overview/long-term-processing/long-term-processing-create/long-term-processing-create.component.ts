import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {Store} from '@ngxs/store';
import {AuthState} from '../../../../core/store/auth.state';
import {ProcessingService} from '../../../../core/services/processing/processing.service';
import {DefaultNlpConfiguration} from '../../../../config/default.nlp.configuration';
import {bigDataEndpoint} from '../../../../config/global.configuration';

@Component({
  selector: 'app-long-term-processing-create',
  templateUrl: './long-term-processing-create.component.html',
  styleUrls: ['./long-term-processing-create.component.scss']
})
export class LongTermProcessingCreateComponent implements OnInit {

  jobType = 'URL';

  archiveUrl = null;

  formData = new FormData();

  inputFormat = 'TXT';
  language = 'de';
  fileSuffix = 'zip';

  selectedFiles = [];

  loading = false;

  public uploader: FileUploader = new FileUploader({url: `${bigDataEndpoint}/analyse`});

  constructor(private store: Store, private processingService: ProcessingService) {
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      this.selectedFiles.push(file);
    };
  }

  buildFormData() {
    this.buildFilesArray();

    const session = this.store.selectSnapshot(AuthState.session);

    this.processingService.createJobFromFiles(this.formData, this.language, session, this.inputFormat, this.fileSuffix, DefaultNlpConfiguration.getDefaultConfig(this.language)).subscribe(
      () => this.loading = false
    );
  }

  startUrlJob() {
    const session = this.store.selectSnapshot(AuthState.session);

    this.processingService.createJobFromUrl(this.archiveUrl, this.language, session, this.inputFormat, this.fileSuffix, DefaultNlpConfiguration.getMinimalConfig()).subscribe(
      () => this.loading = false
    );
  }

  private buildFilesArray() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.formData.append(`file[${i}]`, this.selectedFiles[i]);
    }
  }

  notComplete() {
    return (this.selectedFiles.length <= 0 && this.jobType === 'FILES') || (!this.archiveUrl && this.jobType === 'URL') || !this.inputFormat || !this.language || !this.fileSuffix;
  }

  startJob() {
    this.loading = true;

    if (this.jobType === 'FILES') {
      this.buildFormData();
    } else {
      this.startUrlJob();
    }
  }
}
