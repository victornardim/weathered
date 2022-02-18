import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LocationClient } from './location.client';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [LocationClient, LocationService],
})
export class LocationModule {}
