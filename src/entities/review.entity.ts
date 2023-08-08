import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews_test')
export class Wallet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  hospitalId: string;

  @Column()
  userId: string;

  @Column()
  comment: string;

  @Column()
  imageUrl: string;

  @Column()
  treatmentNm: string;

  @Column()
  rate: number;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;
}
