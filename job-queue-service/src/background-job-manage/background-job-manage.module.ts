import { Module } from '@nestjs/common';
import { BackgroundJobManageService } from './background-job-manage.service';
import { BackgroundJobManageController } from './background-job-manage.controller';
import { BullModule } from '@nestjs/bullmq';

export const QUEUES = [
  { name: 'business-logic-service-queue' },
  /** add all queues from all services here 
  {  name: 'service-1-queue-2' },
  {  name: 'service-2-queue-1' },
  */
];

@Module({
  imports: [BullModule.registerQueue(...QUEUES)],
  controllers: [BackgroundJobManageController],
  providers: [BackgroundJobManageService],
})
export class BackgroundJobManageModule {}
