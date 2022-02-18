import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

import helmet from 'helmet';

export class App {
  public static async get(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    return app;
  }
}
