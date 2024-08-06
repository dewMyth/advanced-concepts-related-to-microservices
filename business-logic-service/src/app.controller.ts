import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('queue')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('produce-job')
  async produceABullJob() {
    return this.appService.createAndProduceABullJob();
  }

  @Post('produce-job-in-external-job-service')
  async produceABullJobToExternalJobService() {
    return this.appService.createAndProduceABullJobToExternalJobSerivce();
  }
}
