import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { TimezoneClient } from './timezone.client';
import { TimezoneController } from './timezone.controller';
import { TimezoneRepository } from './timezone.repository';
import { TimezoneService } from './timezone.service';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: 0 })],
  controllers: [TimezoneController],
  providers: [TimezoneService, TimezoneRepository, TimezoneClient],
  exports: [TimezoneService],
})
export class TimezoneModule {}
