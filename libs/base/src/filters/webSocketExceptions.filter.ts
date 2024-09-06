import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BasePatterns } from '../enums/sockets/BasePatterns';

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const context = host.switchToWs();

    const client = context.getClient() as Socket;
    const pattern = context.getPattern();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof WsException
          ? (exception.getError() as any).statusCode
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const error: any =
      exception instanceof WsException
        ? exception.getError()
        : exception instanceof HttpException
          ? exception.getResponse()
          : (exception as any).message;

    const code = error?.code;
    const identifier = error?.identifier;
    const message = error instanceof Object ? error?.message : error;

    error?.stack && delete error?.stack;

    console.log({
      date: new Date().toISOString(),
      type: 'WsException',
      pattern,
      exception,
    });

    delete error?.code;
    delete error?.identifier;
    delete error?.statusCode;

    const details =
      error instanceof Object
        ? (() => {
            delete error?.message;
            return error;
          })()
        : undefined;

    client.emit(BasePatterns.error, {
      id: (client as any).id,
      pattern,
      timestamp: new Date().toISOString(),
      error: {
        code: code || 'generalError',
        identifier: identifier || null,
        statusCode: status || 500,
        message: message || null,
        metadata: { ...details },
      },
    });
  }
}
