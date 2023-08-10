import { Controller, Get, Param, Query, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { ChatbotService } from "./chatbot.service";

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {};

  @Post(':userId')
  async runChatbot(@Param('userId') userId: string, @Body('messages') messages: any[]): Promise<any>{
    try{
      return this.chatbotService.runChatbot(userId, messages);
    }catch (e) {
      console.error(`Error in runChatbot ${e}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
