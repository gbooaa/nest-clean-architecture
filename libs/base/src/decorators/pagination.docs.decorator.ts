import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function PaginationDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Numero de página a buscar',
    }),
    ApiQuery({
      name: 'items',
      required: false,
      description: 'Cantidad de elementos por página',
    }),
  );
}
