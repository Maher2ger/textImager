import {JobDocumentInfo} from './job.document.info';
import {JobInfo} from './job.info';

export interface Job {

  jobId: string;
  documents: JobDocumentInfo[];
  jobInfo: JobInfo;
}
