import { Module } from '@nestjs/common';
import { BackgroundJobManageService } from './background-job-manage.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [BullModule.registerQueue({ name: 'business-logic-service-queue' })],
  controllers: [],
  providers: [BackgroundJobManageService],
})
export class BackgroundJobManageModule {}
