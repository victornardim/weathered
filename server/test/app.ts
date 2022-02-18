import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

export class TestApp {
  public static get(testingModule: TestingModule): INestApplication {
    const app = testingModule.createNestApplication();
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
