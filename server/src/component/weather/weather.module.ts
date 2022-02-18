import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TimezoneModule } from '../timezone/timezone.module';
import { WeatherClient } from './weather.client';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule, TimezoneModule],
  controllers: [WeatherController],
  providers: [WeatherClient, WeatherService],
})
export class WeatherModule {}
