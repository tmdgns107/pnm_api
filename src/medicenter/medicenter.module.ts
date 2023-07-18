import { Module } from '@nestjs/common';
import { MedicenterController } from './medicenter.controller';
import { MedicenterService } from './medicenter.service';

@Module({
  controllers: [MedicenterController],
  providers: [MedicenterService]
})
export class MedicenterModule {}
