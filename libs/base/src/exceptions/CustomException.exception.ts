import { CustomCodes, CustomCodesDefinition } from '@libs/common/exceptions';
import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(code: CustomCodes, data?: Record<string, any>) {
    const referenceError = CustomCodesDefinition[code];

    let metadata: any = {};

    Array.isArray(data) || ['boolean', 'number', 'string'].includes(typeof data)
      ? (metadata.info = data)
      : (metadata = { ...data });

    super(
      {
        code,
        message: referenceError.message,
        identifier: referenceError?.identifier,
        ...metadata,
      },
      referenceError.statusCode,
    );
  }
}
