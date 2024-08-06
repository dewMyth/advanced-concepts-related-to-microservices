import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, JobsOptions, Queue } from 'bullmq';

@Injectable()
export class BackgroundJobManageService {
  constructor(
    @InjectQueue('business-logic-service-queue')
    private _businessLogicServiceQueue: Queue,
  ) {}

  async postToBusinessLogicServiceProcessQueue(
    payload: any,
    jobName: string,
    options?: JobsOptions,
  ): Promise<Job> {
    const job = await this._businessLogicServiceQueue.add(
      jobName,
      payload,
      options,
    );
    console.log(`Job No : ${job.id} added to business-logic-service-queue`);
    return job;
  }
}
