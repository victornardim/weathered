import { Controller, Get, Param, ParseFloatPipe } from '@nestjs/common';
import { LatitudeValidationPipe } from '../core/pipe/latitude-validation.pipe';
import { LongitudeValidationPipe } from '../core/pipe/longitude-validation.pipe';
import { WeatherDto } from './model/weather.dto';
import { WeatherService } from './weather.service';

@Controller({
  path: '/weather',
  version: '1',
})
export class WeatherController {
  constructor(private service: WeatherService) {}

  @Get('/:latitude/:longitude')
  public async getByCoordinates(
    @Param('latitude', ParseFloatPipe, LatitudeValidationPipe)
    latitude: number,
    @Param('longitude', ParseFloatPipe, LongitudeValidationPipe)
    longitude: number,
  ): Promise<WeatherDto> {
    return await this.service.getByCoordinates(latitude, longitude);
  }
}
