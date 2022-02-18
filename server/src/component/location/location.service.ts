import { Injectable, NotFoundException } from '@nestjs/common';
import { LocationClient } from './location.client';
import { LocationDto } from './model/location.dto';
import { LocationMapper } from './model/mapper/location.mapper';

@Injectable()
export class LocationService {
  constructor(private client: LocationClient) {}

  public async getByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<LocationDto> {
    const location = await this.client.getByCoordinates(latitude, longitude);

    if (!location.address) {
      throw new NotFoundException(
        `Location not found for coordinates ${latitude} ${longitude}`,
      );
    }

    return LocationMapper.translate(location);
  }

  public async getByName(name: string): Promise<LocationDto> {
    const coordinates = await this.client.getByName(name);

    if (!coordinates.length) {
      throw new NotFoundException(`Location '${name}' not found`);
    }

    return this.getByCoordinates(
      Number(coordinates[0].lat),
      Number(coordinates[0].lon),
    );
  }
}
