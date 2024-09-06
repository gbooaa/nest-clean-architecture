import { HttpStatus } from '@nestjs/common';

export interface BaseHandlerErrors {
  /** Código de estado HTTP @see https://developer.mozilla.org/es/docs/Web/HTTP/Status */
  statusCode: number | HttpStatus;

  /** Código único de error identificado @default 'generalError' */
  code: string;

  /** Mensaje descriptivo a enviar */
  message: any;

  /** Identificador único de error */
  identifier?: number;
}
