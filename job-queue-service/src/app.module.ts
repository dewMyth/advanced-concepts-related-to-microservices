import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackgroundJobManageModule } from './background-job-manage/background-job-manage.module';
import { BullModule } from '@nestjs/bullmq';
import { BackgroundJobManageService } from './background-job-manage/background-job-manage.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BackgroundJobManageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
