import {
  ValidationArguments,
  ValidationOptions,
  isMongoId,
  registerDecorator,
} from 'class-validator';

export function IsMongoIdOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMongoIdOrNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === null || isMongoId(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a MongoID or null`;
        },
      },
    });
  };
}
