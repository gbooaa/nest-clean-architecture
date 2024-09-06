import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const { tokenUser } = ctx.switchToHttp().getRequest();

  return tokenUser ?? null;
});
