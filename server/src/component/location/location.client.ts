import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { LocationSearch } from './model/client/location-search.interface';
import { LocationReverseSearch } from './model/client/location-reverse-search.interface';

@Injectable()
export class LocationClient {
  private readonly BASE_URL = process.env.LOCATION_CLIENT_URL;

  constructor(private httpService: HttpService) {}

  public async getByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<LocationReverseSearch> {
    const url = `${this.BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }

  public async getByName(name: string): Promise<LocationSearch[]> {
    const url = `${this.BASE_URL}/search?q=${encodeURI(name)}&format=json`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
