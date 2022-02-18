import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER, INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CoreModule } from '../../src/component/core/core.module';
import { TestApp } from '../app';
import { TimezoneModule } from '../../src/component/timezone/timezone.module';
import { TimezoneClient } from '../../src/component/timezone/timezone.client';

import invalidLatitudeRange from './mocks/invalid-latitude-range.json';
import invalidLongitudeRange from './mocks/invalid-longitude-range.json';
import invalidLatitudeType from './mocks/invalid-latitude-type.json';
import invalidLongitudeType from './mocks/invalid-longitude-type.json';

import client from './mocks/client.mock';
import cache from './mocks/cache.mock';

describe('TimezoneController valid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TimezoneModule, CoreModule],
    })
      .overrideProvider(TimezoneClient)
      .useValue(client)
      .overrideProvider(CACHE_MANAGER)
      .useValue(cache)
      .compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(POST) given valid coordinates, should return created', () => {
    return request(app.getHttpServer())
      .post('/v1/timezone')
      .send({
        latitude: -20.795927647186,
        longitude: -49.3840813636779,
      })
      .expect(201);
  });
});

describe('TimezoneController invalid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TimezoneModule, CoreModule],
    })
      .overrideProvider(TimezoneClient)
      .useValue(client)
      .overrideProvider(CACHE_MANAGER)
      .useValue(cache)
      .compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(POST) given an invalid latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .post('/v1/timezone')
      .send({
        latitude: -200.795927647186,
        longitude: -49.3840813636779,
      })
      .expect(400)
      .expect(invalidLatitudeRange);
  });

  it('(POST) given an invalid longitude, should return bad request', () => {
    return request(app.getHttpServer())
      .post('/v1/timezone')
      .send({
        latitude: -20.795927647186,
        longitude: -409.3840813636779,
      })
      .expect(400)
      .expect(invalidLongitudeRange);
  });

  it('(POST) given a string latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .post('/v1/timezone')
      .send({
        latitude: 'a',
        longitude: -49.3840813636779,
      })
      .expect(400)
      .expect(invalidLatitudeType);
  });

  it('(POST) given a string longitude, should return bad request', () => {
    return request(app.getHttpServer())
      .post('/v1/timezone')
      .send({
        latitude: -20.795927647186,
        longitude: 'b',
      })
      .expect(400)
      .expect(invalidLongitudeType);
  });
});
