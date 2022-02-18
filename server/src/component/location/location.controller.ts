import { Controller, Get, Param, ParseFloatPipe } from '@nestjs/common';
import { LatitudeValidationPipe } from '../core/pipe/latitude-validation.pipe';
import { LongitudeValidationPipe } from '../core/pipe/longitude-validation.pipe';
import { LocationService } from './location.service';
import { LocationDto } from './model/location.dto';

@Controller({
  path: '/location',
  version: '1',
})
export class LocationController {
  constructor(private service: LocationService) {}

  @Get('/:latitude/:longitude')
  public getByCoordinates(
    @Param('latitude', ParseFloatPipe, LatitudeValidationPipe)
    latitude: number,
    @Param('longitude', ParseFloatPipe, LongitudeValidationPipe)
    longitude: number,
  ): Promise<LocationDto> {
    return this.service.getByCoordinates(latitude, longitude);
  }

  @Get('/:name')
  public getByName(@Param('name') name: string): Promise<LocationDto> {
    return this.service.getByName(name);
  }
}
