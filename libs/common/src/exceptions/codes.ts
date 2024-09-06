import { ErrorFromEnumObject } from '@libs/base/interfaces';
import { HttpStatus } from '@nestjs/common';

/** Estructura de los códigos: {modulo}{Error} @example productsError, userError */
export enum CustomCodes {
  // Add custom codes | Don't remove this line
  genderNotFound = 'genderNotFound',
  genderDuplicated = 'genderDuplicated',
  productNotFound = 'productNotFound',
  productDuplicated = 'productDuplicated',
  userNotFound = 'userNotFound',
}

export const CustomCodesDefinition: ErrorFromEnumObject<typeof CustomCodes> = {
  // Add custom codes definition | Don't remove this line
  genderNotFound: {
    message: 'Gender not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
  genderDuplicated: {
    message: 'The gender is duplicated',
    statusCode: HttpStatus.CONFLICT,
  },
  productNotFound: {
    message: 'Product not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
  productDuplicated: {
    message: 'The product is duplicated',
    statusCode: HttpStatus.CONFLICT,
  },
  userNotFound: {
    message: 'User not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
};
