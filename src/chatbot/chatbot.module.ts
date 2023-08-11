import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ChatbotController],
  providers: [ChatbotService]
})
export class ChatbotModule {}
