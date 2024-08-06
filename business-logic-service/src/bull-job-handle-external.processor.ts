import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AppService } from './app.service';

@Processor('business-logic-service-queue')
export class BusinessLogicServiceJobQueueConsumer extends WorkerHost {
  constructor(private _appService: AppService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'calculate-from-x-to-y-from-job-service': {
        const result = await this._appService.calculateFromX2YLogic(job.data);
        if (!result) {
          console.log(`Calculating Job failed for Job : ${job.id}`);
        }
        console.log(result);
      }
    }
  }
}
