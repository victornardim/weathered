import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LatitudeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value < -90 || value > 90) {
      throw new BadRequestException(
        'Latitude must be in a range between -90 and 90',
      );
    }

    return value;
  }
}
