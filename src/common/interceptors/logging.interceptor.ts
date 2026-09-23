import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';

// =============================================================================
// LoggingInterceptor  —  👤 Estudiante 2
// -----------------------------------------------------------------------------
// Objetivo: registrar en consola cada petición y cuánto tardó.
//
//   [Nest] 12345  - LOG [HTTP] GET /orders 3ms
//   [Nest] 12345  - LOG [HTTP] POST /orders 5ms
//   [Nest] 12345  - ERROR [HTTP] GET /orders/reports/heavy-process 3004ms - Request Timeout
//
// Operador RxJS: tap()  → ejecuta un efecto secundario (loguear) SIN
//                         modificar la respuesta.
// =============================================================================

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
  const request = context.switchToHttp().getRequest<Request>();
  const { method, originalUrl: url } = request;
  const start = Date.now();

  return next.handle().pipe(
    tap({
      next: () => {
        const ms = Date.now() - start;
        this.logger.log(`${method} ${url} ${ms}ms`);
      },
      error: (err) => {
        const ms = Date.now() - start;
        this.logger.error(
          `${method} ${url} ${ms}ms - ${err.message}`,
        );
      },
    }),
  );

    return next.handle();
  }
}
