import { Injectable, NotFoundException } from '@nestjs/common';
import { TimezoneClient } from './timezone.client';
import { TimezoneRepository } from './timezone.repository';

@Injectable()
export class TimezoneService {
  constructor(
    private repository: TimezoneRepository,
    private client: TimezoneClient,
  ) {}

  public async saveByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<void> {
    await this.repository.save(
      this.client.getByCoordinates(latitude, longitude)[0],
    );
  }

  public async get(): Promise<string> {
    const timezone = await this.repository.get();

    if (!timezone) {
      throw new NotFoundException(
        'Timezone not found, please refresh the application',
      );
    }

    return timezone;
  }
}
