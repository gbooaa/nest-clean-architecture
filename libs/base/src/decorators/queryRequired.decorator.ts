import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

/**
 * Decorator that validates that a query string exists and verifies that it is supplied.
 */
export const QueryRequired = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const value = request.query[key];

  if (value === undefined) {
    throw new BadRequestException(`Missing required query param: '${key}'`);
  }

  return value;
});
