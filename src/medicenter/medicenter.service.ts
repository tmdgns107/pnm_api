import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { Hospital } from "../entities/hospital.entity";
import { Pharmacy } from "../entities/pharmacy.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MedicenterService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Pharmacy)
    private pharmacyRepository: Repository<Pharmacy>
  ) {};

  async getMedicenters(centerType: string, sidoNm: string, sigunNm?: string, dongNm?: string): Promise<any> {
    let repository;

    if (centerType === 'hospital')
      repository = this.hospitalRepository;
    else if (centerType === 'pharmacy')
      repository = this.pharmacyRepository;

    const whereCondition = {};
    if(sidoNm)
      whereCondition['sidoNm'] = sidoNm;
    if(sigunNm)
      whereCondition['sigunNm'] = sigunNm;
    if(dongNm)
      whereCondition['dongNm'] = dongNm;

    return await repository.find({ where: whereCondition });
  }


  async getMedicenter(centerType: string, id: string): Promise<any> {
    let repository;
    if (centerType === 'hospital')
      repository = this.hospitalRepository;
    else if(centerType === 'pharmacy')
      repository = this.pharmacyRepository;

    const medicenter = await repository.findOne(id);
    if(!medicenter) {
      console.log(`${centerType} not found`)
      throw new HttpException(`${centerType} not found`, HttpStatus.NOT_FOUND);
    }

    return medicenter;
  }
}
