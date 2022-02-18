import { Body, Controller, Post } from '@nestjs/common';
import { CoordinatesDto } from './model/coordinates.dto';
import { TimezoneService } from './timezone.service';

@Controller({
  path: '/timezone',
  version: '1',
})
export class TimezoneController {
  constructor(private service: TimezoneService) {}

  @Post('/')
  public async saveByCoordinates(
    @Body() coordinates: CoordinatesDto,
  ): Promise<void> {
    await this.service.saveByCoordinates(
      coordinates.latitude,
      coordinates.longitude,
    );
  }
}
