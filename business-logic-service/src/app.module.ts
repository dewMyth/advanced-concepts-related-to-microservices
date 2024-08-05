import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';

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
    BullModule.registerQueue(
      {
        name: 'job-queue',
      },
    ),


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
