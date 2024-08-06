import { Injectable } from '@nestjs/common';
import { JobPayloadType } from './job-payload.dt';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class BackgroundJobManageService {
  private _backgroundJobUrl = 'http://localhost:3001/background-job-manage';

  async addToBullJob(jobRequestPayload: JobPayloadType) {
    const { config, data, jobName, joboptions, queueName } = jobRequestPayload;

    const constructedUrl =
      this._backgroundJobUrl + '/' + queueName + '/' + jobName;

    let customConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const dataObj = {
      ...data,
      joboptions: joboptions,
    };

    console.log(
      `Ready to produce the job to ${constructedUrl} with payload ${JSON.stringify(dataObj)} & configurations ${JSON.stringify(customConfig)}`,
    );

    const response = await axios
      .post(constructedUrl, dataObj, customConfig)
      .catch((err) => console.log(err));

    if (!response) {
      ('Unable to send the Job to the External Job Handling Service.');
    }
    console.log(`Job Successfully produced to ${jobName} in ${queueName}`);
  }
}
