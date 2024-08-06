import { JobsOptions } from 'bullmq';

export interface JobPayloadType {
  queueName: string;
  jobName: string;
  data: any;
  joboptions: JobsOptions;
  config: any;
}
