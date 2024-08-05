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

  // Bull Job Configuration Step 9 - The Business Logic
  async calculateFromX2YLogic(payload) {
    console.log('Job Data', payload);
    const { x, y } = payload;

    console.log(x, y);

    for (let x = 0; x <= y; x++) {
      console.log(`Calculating Number : ${x}`);
    }

    return `Calculated till ${y}`;
  }
}
