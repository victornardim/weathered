import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HttpClientInterceptor } from './interceptor/http-client.interceptor';
import path from 'path';

const ENVIROMENT = process.env.NODE_ENV;

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 2,
    }),
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        process.cwd(),
        'env',
        !ENVIROMENT ? '.env' : `.env.${ENVIROMENT}`,
      ),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpClientInterceptor,
    },
  ],
})
export class CoreModule {}
