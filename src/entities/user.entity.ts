import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews_test')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  provider: string;

  @Column()
  accessToken: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column()
  profile: string;

  @Column()
  apiCount: number;

  @Column()
  createTime: string;

  @Column()
  updateTime: string;
}
