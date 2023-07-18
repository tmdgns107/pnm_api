import { Test, TestingModule } from '@nestjs/testing';
import { MedicenterController } from './medicenter.controller';

describe('MedicenterController', () => {
  let controller: MedicenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicenterController],
    }).compile();

    controller = module.get<MedicenterController>(MedicenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
