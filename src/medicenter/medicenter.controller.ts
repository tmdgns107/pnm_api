import { Controller, Get, Param, Query, HttpException, HttpStatus, Post, Body } from "@nestjs/common";
import { MedicenterService } from './medicenter.service';

@Controller('medicenter')
export class MedicenterController {
  constructor(private readonly medicenterService: MedicenterService) {}

  @Get(':centerType')
  async getMedicentersByType(
    @Param('centerType') centerType: string,
    @Query('sidoNm') sidoNm: string,
    @Query('sigunNm') sigunNm: string,
    @Query('dongNm') dongNm: string
  ): Promise<any> {
    try {
      return await this.medicenterService.getMedicenters(centerType, sidoNm, sigunNm, dongNm);
    }catch(e){
      console.log(`Error in getCenters ${e}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':centerType/:id')
  async getMedicenterById(
    @Param('centerType') centerType: string,
    @Param('id') id: string
  ): Promise<any> {
    try {
      return await this.medicenterService.getMedicenter(centerType, id);
    }catch (e){
      console.log(`Error in getCenter ${e}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id')
  async putMedicenterReview(
    @Param('id') id: string,
    @Body('receiptImage') receiptImage: string,
    @Body('userId') userId: string,
    @Body('rate') rate: number,
    @Body('treatmentNm') treatmentNm: string,
    @Body('comment') comment: string,
  ): Promise<any>{
    try {
      return await this.medicenterService.putMedicenterReview(id, receiptImage, userId, rate, treatmentNm, comment);
    }catch (e){
      console.log(`Error in putMedicenterReview ${e}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
