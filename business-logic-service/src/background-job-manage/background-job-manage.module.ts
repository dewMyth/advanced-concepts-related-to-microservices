import { Module } from '@nestjs/common';
import { BackgroundJobManageService } from './background-job-manage.service';
import { BullModule } from '@nestjs/bullmq';
import { UtilsModule } from 'src/utils/utils.module';
import { CustomLoggerService } from 'src/utils/custom-logger.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'business-logic-service-queue' }),
    UtilsModule,
  ],
  controllers: [],
  providers: [BackgroundJobManageService, CustomLoggerService],
})
export class BackgroundJobManageModule {}
