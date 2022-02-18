import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { WeatherSearch } from './model/client/weather-search.interface';

@Injectable()
export class WeatherClient {
  private readonly BASE_URL = process.env.WEATHER_CLIENT_URL;

  private readonly HOURLY_WEATHER_VARIABLES = [
    'temperature_2m',
    'relativehumidity_2m',
    'windspeed_10m',
  ];

  private readonly DAILY_WEATHER_VARIABLES = [
    'temperature_2m_max',
    'temperature_2m_min',
    'weathercode',
  ];

  constructor(private httpService: HttpService) {}

  public async getByCoordinates(
    latitude: number,
    longitude: number,
    timezone: string,
  ): Promise<WeatherSearch> {
    const hourlyWeatherVariables = this.HOURLY_WEATHER_VARIABLES.join(',');
    const dailyWeatherVariables = this.DAILY_WEATHER_VARIABLES.join(',');

    const url = `${this.BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyWeatherVariables}&daily=${dailyWeatherVariables}&timezone=${timezone}`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response.data;
  }
}
