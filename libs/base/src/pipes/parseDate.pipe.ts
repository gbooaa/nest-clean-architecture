import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Promise<string>> {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    if (!value) {
      throw new BadRequestException(`${metadata.data} is required`);
    }

    const dateParsed = new Date(value);

    if (isNaN(dateParsed.valueOf())) {
      throw new BadRequestException(
        `${value} is not a valid date format. Make sure use YYYY-MM-DD or YYYY-MM-DD HH:mm:ss`,
      );
    }

    return value;
  }
}
