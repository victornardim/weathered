import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import axios from 'axios';

@Injectable()
export class HttpClientInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpClientInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (axios.isAxiosError(error)) {
          const requestUrl = context.switchToHttp().getRequest().originalUrl;
          this.logger.error(
            `${requestUrl} -> ${JSON.stringify(error.response.data)}`,
          );
        }
        throw error;
      }),
    );
  }
}
