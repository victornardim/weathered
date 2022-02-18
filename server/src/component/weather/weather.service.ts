import { Injectable } from '@nestjs/common';
import { TimezoneService } from '../timezone/timezone.service';
import { WeatherMapper } from './model/mapper/weather.mapper';
import { WeatherDto } from './model/weather.dto';
import { WeatherClient } from './weather.client';

@Injectable()
export class WeatherService {
  constructor(
    private client: WeatherClient,
    private timezoneService: TimezoneService,
  ) {}

  public async getByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<WeatherDto> {
    return WeatherMapper.translate(
      await this.client.getByCoordinates(
        latitude,
        longitude,
        await this.timezoneService.get(),
      ),
    );
  }
}
