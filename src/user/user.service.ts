import { Injectable, BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(id: string, email: string, image: string, accessToken: string, provider: string): Promise<any>{
    if(!id || !email || !provider){
      console.log('required key');
      throw new BadRequestException("Required key");
    }

    const date: string = moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss');
    const user: User = await this.userRepository.findOne({where: {id: id}});
    if(user){
      user.email = email;
      user.accessToken = accessToken;
      user.provider = provider;
      user.image = image;
      user.updateTime = date;
    }else{
      user.id = id;
      user.email = email;
      user.accessToken = accessToken;
      user.provider = provider;
      user.image = image;
      user.updateTime = user.createTime = date;
    }
    await this.userRepository.save(user);
    return user;
  }
}
