import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospitals_test')
export class Hospital {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  sidoNm: string;

  @Column()
  sigunNm: string;

  @Column()
  bizPlcNm: string;

  @Column()
  roadNmAddr: string;

  @Column()
  lotNoAddr: string;

  @Column()
  zipCode: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  status: string;

  @Column()
  telNo: string;

  @Column()
  rate: number;

  @Column()
  totalRate: number;

  @Column()
  reviewCount: number;

  @Column()
  closedStartDate: string;

  @Column()
  closedEndDate: string;

  @Column()
  reopenDate: string;

  @Column()
  collectDate: string;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;
}
