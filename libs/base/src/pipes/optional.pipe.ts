import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class OptionalPipe implements PipeTransform {
  constructor(private ParsePipe: PipeTransform) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== 0 && !value) {
      return undefined;
    } else {
      return this.ParsePipe.transform(value, metadata);
    }
  }
}
