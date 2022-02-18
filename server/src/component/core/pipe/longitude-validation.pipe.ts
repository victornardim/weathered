import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LongitudeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value < -180 || value > 180) {
      throw new BadRequestException(
        'Longitude must be in a range between -180 and 180',
      );
    }

    return value;
  }
}
