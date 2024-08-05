import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AppService } from './app.service';

// Bull Job Configuration Step 6 - Create Bull Job Consumer/Processor
@Processor('job-queue')
export class JobQueueConsumer extends WorkerHost {
  constructor(private _appService: AppService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    // Bull Job Configuration Step 7 - Handle Job Task using job name
    switch (job.name) {
      case 'calculate-from-x-to-y': {
        // Bull Job Configuration Step 8 - Handle Business Logic once the job get it's chance in queue
        const result = await this._appService.calculateFromX2YLogic(job.data);
        return result;
      }
    }
  }
}
