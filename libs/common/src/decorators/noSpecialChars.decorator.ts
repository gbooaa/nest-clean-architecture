import { ValidationOptions, buildMessage, registerDecorator } from 'class-validator';

export function NoSpecialChars(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          return /^[a-zA-Z0-9\s]+$/.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$value must not contain special characters`,
          validationOptions,
        ),
      },
    });
  };
}
