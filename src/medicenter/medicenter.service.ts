import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository, EntityManager } from "typeorm";
import { Hospital } from "../entities/hospital.entity";
import { Pharmacy } from "../entities/pharmacy.entity";
import { Review } from "../entities/review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as util from "./util";
import * as moment from 'moment';

@Injectable()
export class MedicenterService {
  constructor(
    @InjectRepository(Hospital)
    private hospitalRepository: Repository<Hospital>,
    @InjectRepository(Pharmacy)
    private pharmacyRepository: Repository<Pharmacy>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) {};

  private getRepositoryByCenterType(centerType: string): Repository<Pharmacy | Hospital> {
    switch(centerType) {
      case 'hospital':
        return this.hospitalRepository;
      case 'pharmacy':
        return this.pharmacyRepository;
      default:
        return null;
    }
  }

  async getMedicenters(centerType: string, sidoNm: string, sigunNm?: string, dongNm?: string): Promise<any> {
    const repository = this.getRepositoryByCenterType(centerType);
    if(!repository){
      console.log(`${centerType} not valid`);
      throw new HttpException(`${centerType} not valid`, HttpStatus.BAD_REQUEST);
    }
    const whereCondition = {
      ...(sidoNm && {sidoNm}),
      ...(sigunNm && {sigunNm}),
      ...(dongNm && {dongNm})
    };

    return await repository.find({ where: whereCondition });
  }

  async getMedicenter(centerType: string, id: string): Promise<any> {
    const repository = this.getRepositoryByCenterType(centerType);
    if(!repository){
      console.log(`${centerType} not valid`);
      throw new HttpException(`${centerType} not valid`, HttpStatus.BAD_REQUEST);
    }

    const medicenter = await repository.findOne({where: {id: id}});
    if(!medicenter) {
      console.log(`${centerType} not found`);
      throw new HttpException(`${centerType} not found`, HttpStatus.NOT_FOUND);
    }

    return medicenter;
  }

  async putMedicenterReview(id: string, receiptImage: string, userId: string, reviewRate: number, treatmentNm: string, comment: string) {
    const imageBuffer: Buffer = await util.imageUrlToBuffer(receiptImage);
    if(!imageBuffer){
      console.log("Failed to convert image file to buffer data.");
      return {success: false, message: 'Failed to convert image file to buffer data.'};
    }

    const isReceipt: boolean = await util.isReceipt(imageBuffer);
    if(!isReceipt){
      console.log("Image is not a receipt file.");
      return {success: false, message: 'Image is not a receipt file.'};
    }

    const hospital = await this.hospitalRepository.findOne({where: {id: id}});
    if(!hospital){
      console.log('hospital not found.');
      throw new HttpException('hospital not found.', HttpStatus.NOT_FOUND);
    }

    const { reviewCount, totalRate, rate } = util.getAverage(hospital.reviewCount, hospital.totalRate, reviewRate);
    hospital.reviewCount = reviewCount;
    hospital.totalRate = totalRate;
    hospital.rate = rate;

    const date = moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss');
    const review = new Review();
    review.hospitalId = id;
    review.userId = userId;
    review.comment = comment;
    review.updateTime = date;
    review.createTime = date;
    review.imageUrl = receiptImage;
    review.treatmentNm = treatmentNm;
    review.rate = reviewRate;

    try {
      await this.hospitalRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
        await transactionalEntityManager.save(Review, review);
        await transactionalEntityManager.save(Hospital, hospital);
      });
    }catch (e) {
      console.error('Error occurred while processing transaction:', e);
      throw new HttpException('Failed to process transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {success: true, message: 'Your review has been successfully written.'};
  }
}
