import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class CoordinatesDto {
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;
}
