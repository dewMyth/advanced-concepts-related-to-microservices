import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { CustomLoggerService } from './custom-logger.service';

@Module({
  controllers: [UtilsController],
  providers: [UtilsService, CustomLoggerService],
  exports: [CustomLoggerService],
})
export class UtilsModule {}
