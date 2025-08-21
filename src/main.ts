// ~/zapty-project/src/main.ts
import * as dotenv from 'dotenv'; // Importe o dotenv
dotenv.config(); // Carregue as variáveis de ambiente

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();