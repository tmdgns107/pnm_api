import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import * as serverlessHttp from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
let app;

async function bootstrap() {
  app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
}

bootstrap();

const handler = serverlessHttp(expressApp);
export { handler };
