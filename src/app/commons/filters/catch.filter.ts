import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if ((res as Record<string, any>)?.message) {
        message = ((res as Record<string, any>)?.message as any) || message;
        errors = ((res as Record<string, any>)?.errors as any[]) || [];
      } else if (exception instanceof Error) {
        message = exception.message;
      }

      response.status(status).json({
        status: false,
        errors,
        message,
      });
    }
  }
}
