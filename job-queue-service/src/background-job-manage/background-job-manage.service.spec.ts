import { Test, TestingModule } from '@nestjs/testing';
import { BackgroundJobManageService } from './background-job-manage.service';

describe('BackgroundJobManageService', () => {
  let service: BackgroundJobManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackgroundJobManageService],
    }).compile();

    service = module.get<BackgroundJobManageService>(BackgroundJobManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
