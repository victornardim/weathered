import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { TestApp } from '../app';
import { LocationModule } from '../../src/component/location/location.module';
import { CoreModule } from '../../src/component/core/core.module';

import location from './mocks/location.json';
import invalidType from './mocks/invalid-type.json';
import invalidLatitudeRange from './mocks/invalid-latitude-range.json';
import invalidLongitudeRange from './mocks/invalid-longitude-range.json';
import locationByCoordinatesNotFound from './mocks/location-by-coordinates-not-found.json';
import locationByNameNotFound from './mocks/location-by-name-not-found.json';

describe('WeatherController valid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationModule, CoreModule],
    }).compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(GET) given a valid latitude and longitude, should return a reverse search location', () => {
    return request(app.getHttpServer())
      .get('/v1/location/-23.5506507/-46.6333824')
      .expect(200)
      .expect(location);
  });

  it('(GET) given a valid name, should return a location', () => {
    return request(app.getHttpServer())
      .get('/v1/location/são paulo')
      .expect(200)
      .expect(location);
  });
});

describe('WeatherController invalid state tests (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LocationModule, CoreModule],
    }).compile();

    app = TestApp.get(moduleFixture);
    await app.init();
  });

  it('(GET) given an invalid range latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/location/-203.5506507/-46.6333824')
      .expect(400)
      .expect(invalidLatitudeRange);
  });

  it('(GET) given an invalid range latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/location/-23.5506507/-406.6333824')
      .expect(400)
      .expect(invalidLongitudeRange);
  });

  it('(GET) given a string latitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/location/a/-46.6333824')
      .expect(400)
      .expect(invalidType);
  });

  it('(GET) given a string longitude, should return bad request', () => {
    return request(app.getHttpServer())
      .get('/v1/location/-23.5506507/b')
      .expect(400)
      .expect(invalidType);
  });

  it('(GET) given coordinates with no location, should return not found', () => {
    return request(app.getHttpServer())
      .get('/v1/location/-50/-10')
      .expect(404)
      .expect(locationByCoordinatesNotFound);
  });

  it('(GET) given an invalid location name, should return not found', () => {
    return request(app.getHttpServer())
      .get('/v1/location/invalid location')
      .expect(404)
      .expect(locationByNameNotFound);
  });
});
