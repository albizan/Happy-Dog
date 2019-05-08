// Load Env Variables with Dotenv
import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const HTTP_PORT = Number(process.env.HTTP_PORT);
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Use CORS
  app.enableCors();

  // Use Validation on all endpoints with a global validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(HTTP_PORT);
  logger.log(`App running on port ${HTTP_PORT}`);
}
bootstrap();
