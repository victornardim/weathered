import { Module } from '@nestjs/common';
import { CoreModule } from './component/core/core.module';
import { LocationModule } from './component/location/location.module';
import { TimezoneModule } from './component/timezone/timezone.module';
import { WeatherModule } from './component/weather/weather.module';

@Module({
  imports: [LocationModule, WeatherModule, TimezoneModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
