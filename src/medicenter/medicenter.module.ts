import { Module } from '@nestjs/common';
import { MedicenterController } from './medicenter.controller';
import { MedicenterService } from './medicenter.service';
import { Hospital } from "../entities/hospital.entity";
import { Pharmacy } from "../entities/pharmacy.entity";
import { Review } from "../entities/review.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, Pharmacy, Review])],
  controllers: [MedicenterController],
  providers: [MedicenterService]
})
export class MedicenterModule {}
