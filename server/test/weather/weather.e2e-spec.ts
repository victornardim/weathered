import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER, INestApplication } from '@nestjs/common';
import { WeatherModule } from '../../src/component/weather/weather.module';
import request from 'supertest';

import { CoreModule } from '../../src/component/core/core.module';
import { TestApp } from '../app';

import weather from './mocks/weather.json';
import invalidLatitudeRange from './mocks/invalid-latitude-range.json';
import invalidLongitudeRange from './mocks/invalid-longitude-range.json';
import invalidType from './mocks/invalid-type.json';
import invalidTimezone from './mocks/invalid-timezone.json';

import cache from './mocks/cache.mock';
import invalidCache from './mocks/invalid-cache.mock';

describe('WeatherController valid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WeatherModule, CoreModule, CacheModule],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue(cache)
      .compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(GET) given a valid latitude and longitude, should return the weather forecast', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/-20.79592764718617/-49.384081363677986')
      .expect(200)
      .expect(weather);
  });
});

describe('WeatherController invalid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WeatherModule, CoreModule, CacheModule],
    })
      .overrideProvider(CACHE_MANAGER)
      .useValue(invalidCache)
      .compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(GET) given valid coordinates, and an empty timezone cache, should return not found', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/-20.79592764718617/-49.384081363677986')
      .expect(404)
      .expect(invalidTimezone);
  });

  it('(GET) given an invalid range latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/-200.79592764718617/-49.384081363677986')
      .expect(400)
      .expect(invalidLatitudeRange);
  });

  it('(GET) given an invalid range longitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/-20.79592764718617/-409.384081363677986')
      .expect(400)
      .expect(invalidLongitudeRange);
  });

  it('(GET) given a string latitdue, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/a/-49.384081363677986')
      .expect(400)
      .expect(invalidType);
  });

  it('(GET) given a string longitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/weather/-20.79592764718617/b')
      .expect(400)
      .expect(invalidType);
  });
});
