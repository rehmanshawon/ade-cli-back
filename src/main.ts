// configure dotenv before every thing, even imports
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { CustomeExceptionsFilter } from './custome-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomeExceptionsFilter());
  const port = process.env.APP_PORT;
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
  Logger.log(`Server started on http://localhost:${port}`);
}
bootstrap();
