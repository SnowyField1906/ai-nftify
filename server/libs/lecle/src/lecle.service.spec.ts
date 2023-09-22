import { Test, TestingModule } from '@nestjs/testing';
import { LecleService } from './lecle.service';

describe('LecleService', () => {
  let service: LecleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LecleService],
    }).compile();

    service = module.get<LecleService>(LecleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
