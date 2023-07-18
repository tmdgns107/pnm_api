import { Test, TestingModule } from '@nestjs/testing';
import { MedicenterService } from './medicenter.service';

describe('MedicenterService', () => {
  let service: MedicenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicenterService],
    }).compile();

    service = module.get<MedicenterService>(MedicenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
