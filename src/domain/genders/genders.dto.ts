import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGenderDTO {
  @ApiProperty({
    example: 'gender',
    description: 'gender',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Transform(({ value }) => value.trim())
  name: string;
}

export class UpdateGenderDTO extends PartialType(CreateGenderDTO) {}
