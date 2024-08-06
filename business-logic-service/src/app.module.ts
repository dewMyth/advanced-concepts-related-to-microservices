import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { JobQueueConsumer } from './bull-job.processor';
import { BackgroundJobManageModule } from './background-job-manage/background-job-manage.module';
import { BackgroundJobManageService } from './background-job-manage/background-job-manage.service';
import { BusinessLogicServiceJobQueueConsumer } from './bull-job-handle-external.processor';
import { UtilsModule } from './utils/utils.module';
import { CustomLoggerService } from './utils/custom-logger.service';

@Module({
  imports: [
    // Bull Job Configuration Step 1 - Initialize Bull Module
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // Bull Job Configuration Step 2 - Register a Bull Queue
    BullModule.registerQueue({
      name: 'job-queue',
    }),
    BackgroundJobManageModule,
    UtilsModule,
  ],
  controllers: [AppController],
  // Bull Job Configuration Step 5 - Define the Relevant Consumer/Processor in the Providers array in the module
  providers: [
    AppService,
    JobQueueConsumer,
    BackgroundJobManageService,
    BusinessLogicServiceJobQueueConsumer,
    CustomLoggerService,
  ],
})
export class AppModule {}
