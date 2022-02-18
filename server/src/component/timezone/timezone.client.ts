import { Injectable } from '@nestjs/common';

import lib from 'geo-tz';

@Injectable()
export class TimezoneClient {
  public getByCoordinates(latitude: number, longitude: number): string[] {
    return lib.find(latitude, longitude);
  }
}
