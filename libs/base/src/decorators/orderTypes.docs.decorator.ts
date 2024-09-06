import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { OrderTypes } from '../enums/app/OrderTypes';

export function OrderTypesDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'orderType',
      required: false,
      enum: OrderTypes,
      description: 'Ordenamiento',
    }),
  );
}
