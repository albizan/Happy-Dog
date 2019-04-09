import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Contants
  const HTTP_PORT = Number(process.env.HTTP_PORT);

  const app = await NestFactory.create(AppModule);

  // Use CORS
  app.enableCors();

  await app.listen(HTTP_PORT);
  Logger.log(`App running on port: ${HTTP_PORT}`, 'Bootstrap');
}
bootstrap();
