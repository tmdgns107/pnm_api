import { Injectable, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as util from './chatbot.util';

type Message = {
  role: string,
  content: string
}

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async runChatbot(userId: string, messages: Message[]): Promise<any>{
    const user: User = await this.userRepository.findOne({where:{id: userId}});
    if(!user){
      this.logger.error(`${userId} not found.`);
      throw new HttpException(`${userId} not found`, HttpStatus.NOT_FOUND);
    }

    const returnMessages = await util.callGptAPI(messages);
    if(!returnMessages){
      this.logger.error("An error occurred while searching the gpt api.");
      throw new HttpException("An error occurred while searching the gpt api.", HttpStatus.BAD_REQUEST);
    }else{
      user.apiCount = (user.apiCount || 0) + 1;
      await this.userRepository.save(user);
    }

    return {success: true, messages: returnMessages};
  }
}
