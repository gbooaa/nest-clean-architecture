import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidDTOPipe implements PipeTransform {
  constructor(private readonly dto: any) {}

  async transform(value: any) {
    const dtoObject = new this.dto();
    const reqKeys = Object.keys(value || {});

    reqKeys.forEach((key) => {
      dtoObject[key] = value[key];
    });

    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints));

      const errorsParsed = errorMessages.reduce((acc, val) => acc.concat(val), []);

      throw new BadRequestException(errorsParsed);
    }

    return value;
  }
}
