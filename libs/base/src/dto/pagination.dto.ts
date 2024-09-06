import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Cantidad de items que se deben retornar',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number) // enableImplicitConversion: true
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Cantidad de items a saltar',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Type(() => Number) // enableImplicitConversion: true
  offset?: number;
}
