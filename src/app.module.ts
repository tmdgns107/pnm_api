import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicenterModule } from './medicenter/medicenter.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from "process";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DEV_DB_HOST,
      port: 3306,
      username: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule, MedicenterModule, ChatbotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
