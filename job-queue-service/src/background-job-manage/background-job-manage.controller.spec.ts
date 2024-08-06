import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundJobManageController } from './background-job-manage.controller';
import { BackgroundJobManageService } from './background-job-manage.service';

describe('BackgroundJobManageController', () => {
  let controller: BackgroundJobManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackgroundJobManageController],
      providers: [BackgroundJobManageService],
    }).compile();

    controller = module.get<BackgroundJobManageController>(BackgroundJobManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
