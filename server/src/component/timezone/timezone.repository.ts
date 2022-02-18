import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TimezoneRepository {
  private readonly TIMEZONE_KEY = 'timezone';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async save(timezone: string): Promise<void> {
    await this.cacheManager.set(this.TIMEZONE_KEY, timezone);
  }

  public async get(): Promise<string> {
    return await this.cacheManager.get(this.TIMEZONE_KEY);
  }
}
