import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function GendersDocs(endpoint: string) {
  switch (endpoint) {
    case 'create':
      return applyDecorators(
        ApiOperation({
          summary: 'Crear nuevo gender',
        }),
      );

    case 'getById':
      return applyDecorators(
        ApiOperation({
          summary: 'Obtener un gender',
        }),
      );

    case 'list':
      return applyDecorators(
        ApiOperation({
          summary: 'Obtener un listado de genders',
        }),
      );

    case 'update':
      return applyDecorators(
        ApiOperation({
          summary: 'Actualizar gender',
        }),
      );

    case 'delete':
      return applyDecorators(
        ApiOperation({
          summary: 'Eliminar gender',
        }),
      );

    default:
      break;
  }
}
