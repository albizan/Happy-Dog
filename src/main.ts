import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  // Contants
  const HTTP_PORT = Number(process.env.HTTP_PORT);

  const app = await NestFactory.create(AppModule);

  // Use CORS
  app.enableCors();

  // Use Validation on all endpoints with a global validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(HTTP_PORT);
  Logger.log(`App running on port: ${HTTP_PORT}`, 'Bootstrap');
}
bootstrap();
