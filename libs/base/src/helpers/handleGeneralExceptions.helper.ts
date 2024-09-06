import { InternalServerErrorException, HttpException } from '@nestjs/common';
import { CustomCodes } from '@libs/common/exceptions';
import { CustomException } from '../exceptions';

export const handleGeneralExceptionsHelper = (error: any) => {
  const codeGenerated = error?.response?.code;

  if (codeGenerated && CustomCodes[codeGenerated]) {
    delete error?.response?.code;
    delete error?.response?.message;
    delete error?.response?.identifier;
    throw new CustomException(CustomCodes[codeGenerated], {
      ...error?.response,
    });
  }

  if (error instanceof HttpException) {
    throw error;
  }

  throw new InternalServerErrorException(error);
};
