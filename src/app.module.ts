import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicenterModule } from './medicenter/medicenter.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [UserModule, MedicenterModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
