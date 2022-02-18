import { Test, TestingModule } from '@nestjs/testing';
import { LocationClient } from '../location.client';
import { LocationService } from '../location.service';
import { HttpModule } from '@nestjs/axios';

import reverseSearchLocationMock from './mocks/reverse-search-location.json';
import invalidReverseSearchLocationMock from './mocks/invalid-reverse-search-location.json';
import searchLocationMock from './mocks/search-location.json';
import locationMock from './mocks/location.json';

describe('LocationService', () => {
  let service: LocationService;
  let client: LocationClient;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LocationService, LocationClient],
    }).compile();

    client = app.get<LocationClient>(LocationClient);
    service = app.get<LocationService>(LocationService);
  });

  describe('root', () => {
    it(`should return location when valid coordinates were passed`, () => {
      jest
        .spyOn(client, 'getByCoordinates')
        .mockReturnValue(Promise.resolve(reverseSearchLocationMock));

      expect(
        service.getByCoordinates(-20.796608010933422, -49.38267744702845),
      ).resolves.toEqual(locationMock);
    });

    it(`should return location when a valid name were passed`, () => {
      jest
        .spyOn(client, 'getByName')
        .mockReturnValue(Promise.resolve(searchLocationMock));
      jest
        .spyOn(client, 'getByCoordinates')
        .mockReturnValue(Promise.resolve(reverseSearchLocationMock));

      expect(service.getByName('São José do Rio Preto')).resolves.toEqual(
        locationMock,
      );
    });

    it(`should throw exception when invalid coordinates were passed`, () => {
      jest
        .spyOn(client, 'getByCoordinates')
        .mockReturnValue(
          Promise.resolve(<any>invalidReverseSearchLocationMock),
        );

      expect(service.getByCoordinates(200, 200)).rejects.toThrow(
        `Location not found for coordinates 200 200`,
      );
    });

    it(`should throw exception when a location were not found`, () => {
      jest.spyOn(client, 'getByName').mockReturnValue(Promise.resolve([]));

      expect(service.getByName('Nonexistent Place')).rejects.toThrow(
        `Location 'Nonexistent Place' not found`,
      );
    });
  });
});
