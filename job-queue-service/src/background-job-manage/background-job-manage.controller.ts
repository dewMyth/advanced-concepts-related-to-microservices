import { Body, Controller, Param, Post } from '@nestjs/common';
import { BackgroundJobManageService } from './background-job-manage.service';

@Controller('background-job-manage')
export class BackgroundJobManageController {
  constructor(
    private readonly backgroundJobManageService: BackgroundJobManageService,
  ) {}

  @Post('/:queue/:job')
  async submitToQueue(
    @Body() data: any,
    @Param('queue') queue: string,
    @Param('job') job: string,
  ) {
    let joboptions = {};
    if (data.joboptions) {
      joboptions = data.joboptions;
      delete data.joboptions;
    }

    switch (queue) {
      case 'business-logic-service-queue':
        return await this.backgroundJobManageService.postToBusinessLogicServiceProcessQueue(
          data,
          job,
          joboptions,
        );
    }
  }
}
