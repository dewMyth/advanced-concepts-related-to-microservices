import { Injectable } from '@nestjs/common';
import { JobPayloadType } from './job-payload.dt';
import axios, { AxiosRequestConfig } from 'axios';
import { CustomLoggerService } from 'src/utils/custom-logger.service';

@Injectable()
export class BackgroundJobManageService {
  private _backgroundJobUrl = 'http://localhost:3001/background-job-manage';

  private _logger = new CustomLoggerService(BackgroundJobManageService.name);

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

    this._logger.debug(
      `Ready to produce the job to ${constructedUrl} with payload ${JSON.stringify(dataObj)} & configurations ${JSON.stringify(customConfig)}`,
    );

    const response = await axios
      .post(constructedUrl, dataObj, customConfig)
      .catch((err) => this._logger.error(err));

    if (!response) {
      this._logger.error(
        'Unable to send the Job to the External Job Handling Service.',
      );
    }
    this._logger.debug(
      `Job Successfully produced to ${jobName} in ${queueName}`,
    );
  }
}
