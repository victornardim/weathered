import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneService } from '../timezone.service';

import { TimezoneRepository } from '../timezone.repository';
import { CacheModule } from '@nestjs/common';
import { TimezoneClient } from '../timezone.client';

import validCoordinatesMock from './mocks/valid-coordinates.json';

describe('TimezoneService', () => {
  let service: TimezoneService;
  let client: TimezoneClient;
  let repository: TimezoneRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [TimezoneService, TimezoneRepository, TimezoneClient],
    }).compile();

    service = app.get<TimezoneService>(TimezoneService);
    client = app.get<TimezoneClient>(TimezoneClient);
    repository = app.get<TimezoneRepository>(TimezoneRepository);
  });

  describe('root', () => {
    it(`should save a timezone when valid coordinates were passed`, () => {
      jest
        .spyOn(client, 'getByCoordinates')
        .mockReturnValue(['America/Sao_Paulo']);

      service.saveByCoordinates(
        validCoordinatesMock.latitude,
        validCoordinatesMock.longitude,
      );

      expect(client.getByCoordinates).toReturnWith(['America/Sao_Paulo']);
    });

    it(`should return a valid timezone when there is a saved timezone`, () => {
      jest
        .spyOn(repository, 'get')
        .mockReturnValue(Promise.resolve('America/Sao_Paulo'));

      expect(service.get()).resolves.toEqual('America/Sao_Paulo');
    });

    it(`should return error when there is no saved timezone`, () => {
      jest.spyOn(repository, 'get').mockReturnValue(Promise.resolve(''));

      service.saveByCoordinates(
        validCoordinatesMock.latitude,
        validCoordinatesMock.longitude,
      );

      expect(service.get()).rejects.toThrow(
        'Timezone not found, please refresh the application',
      );
    });
  });
});
