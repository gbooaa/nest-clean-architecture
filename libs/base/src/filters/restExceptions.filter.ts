import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class RestExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const code = exception?.response?.code;
    const identifier = exception?.response?.identifier;

    exception?.response?.stack && delete exception?.response?.stack;

    console.log({
      date: new Date().toISOString(),
      type: 'HttpException',
      path: request.url,
      exception,
    });

    delete exception?.response?.code;
    delete exception?.response?.identifier;
    delete exception?.response?.statusCode;

    if (exception?.response?.message === exception?.message) {
      delete exception?.response?.message;
    }

    response.status(status).json({
      path: request.url,
      timestamp: new Date().toISOString(),
      error: {
        code: code || 'generalError',
        identifier: identifier || null,
        statusCode: status || 500,
        message: exception?.message || null,
        metadata: {
          ...exception?.response,
        },
      },
    });
  }
}
