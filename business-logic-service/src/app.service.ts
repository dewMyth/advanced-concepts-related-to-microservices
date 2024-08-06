import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { delay, JobsOptions, Queue } from 'bullmq';
import { BackgroundJobManageModule } from './background-job-manage/background-job-manage.module';
import { BackgroundJobManageService } from './background-job-manage/background-job-manage.service';
import { JobPayloadType } from './background-job-manage/job-payload.dt';
import { CustomLoggerService } from './utils/custom-logger.service';

@Injectable()
export class AppService {
  // Bull Job Configuration Step 3 - Inject the Bull Queue to relevant service
  constructor(
    @InjectQueue('job-queue')
    private jobQueue: Queue,
    private _backgroundJobService: BackgroundJobManageService,
  ) {}

  private _logger = new CustomLoggerService(AppService.name);

  async createAndProduceABullJob() {
    // Bull Job Configuration Step 4 - Create the and Send the payload to Bull Queue/Redis
    const jobPayload = {
      x: 100,
      y: 1000000,
    };

    const jobConfigs: JobsOptions = {
      attempts: 3,
      delay: 3000,
    };

    const jobName = 'calculate-from-x-to-y';

    const job = await this.jobQueue.add(jobName, jobPayload, jobConfigs);

    return 'Job Submission Success';
  }

  async createAndProduceABullJobToExternalJobSerivce() {
    // Create Job Payload

    const jobPayload: JobPayloadType = {
      queueName: 'business-logic-service-queue',
      jobName: 'calculate-from-x-to-y-from-job-service',
      data: {
        x: 100,
        y: 1000,
      },
      config: {},
      joboptions: {
        delay: 5000,
      },
    };

    await this._backgroundJobService.addToBullJob(jobPayload);
  }

  // Bull Job Configuration Step 9 - The Business Logic
  async calculateFromX2YLogic(payload) {
    const { x, y } = payload;

    for (let x = 0; x <= y; x++) {
      this._logger.verbose(`Calculating Number : ${x}`);
    }

    return `Calculated till ${y}`;
  }
}
