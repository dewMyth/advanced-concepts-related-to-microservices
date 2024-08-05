import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';

@Injectable()
export class AppService {
  // Bull Job Configuration Step 3 - Inject the Bull Queue to relevant service
  constructor(@InjectQueue('job-queue') private jobQueue: Queue) {}

  async createAndProduceABullJob() {
    // Bull Job Configuration Step 4 - Create the and Send the payload to Bull Queue/Redis
    const jobPayload = {
      key1: 'value1',
      key2: 'value2',
    };

    const jobConfigs: JobsOptions = {
      attempts: 3,
      delay: 3000,
    };

    const someUniqueNameForJob =
      'someUniqueNameForJobThatDescribeTheJobInStringFormat';

    const job = await this.jobQueue.add(
      someUniqueNameForJob,
      jobPayload,
      jobConfigs,
    );

    return 'Job Submission Success';
  }
}
