import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneModule } from '../../timezone/timezone.module';
import { TimezoneService } from '../../timezone/timezone.service';
import { WeatherClient } from '../weather.client';
import { WeatherService } from '../weather.service';

import weatherSearchMock from './mocks/weather-search.json';
import weatherMock from './mocks/weather.json';

describe('WeatherService', () => {
  let service: WeatherService;
  let client: WeatherClient;
  let timezoneService: TimezoneService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, TimezoneModule],
      providers: [WeatherService, WeatherClient],
    }).compile();

    service = app.get<WeatherService>(WeatherService);
    client = app.get<WeatherClient>(WeatherClient);
    timezoneService = app.get<TimezoneService>(TimezoneService);
  });

  describe('root', () => {
    it(`should return the weather when valid coordinates were passed`, () => {
      jest
        .spyOn(client, 'getByCoordinates')
        .mockReturnValue(Promise.resolve(weatherSearchMock));
      jest
        .spyOn(timezoneService, 'get')
        .mockReturnValue(Promise.resolve('Amercia/Sao_Paulo'));

      expect(
        service.getByCoordinates(-20.79592764718617, -49.384081363677986),
      ).resolves.toEqual(weatherMock);
    });
  });
});
