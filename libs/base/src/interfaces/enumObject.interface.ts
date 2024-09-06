import { BaseHandlerErrors } from './baseHandlerErrors.interface';

export type ErrorFromEnumObject<T extends Record<string, string | number>> = {
  [K in keyof T]: Omit<BaseHandlerErrors, 'code'>;
};
