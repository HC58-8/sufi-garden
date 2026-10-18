import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any = 'Une erreur interne est survenue sur le serveur.';
    if (isHttpException) {
      const res = exception.getResponse();
      message = typeof res === 'object' && (res as any).message ? (res as any).message : res;
    } else {
      // Log critical unexpected error with stack trace internally (never expose to client)
      this.logger.error(
        `[${request.method}] ${request.url} - Error: ${(exception as any)?.message || exception}`,
        (exception as any)?.stack,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
