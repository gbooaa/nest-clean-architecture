import { CustomException } from '@libs/base/exceptions';
import { CustomCodes } from '@libs/common/exceptions';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();

  if (!user) {
    throw new CustomException(CustomCodes.userNotFound);
  }

  return !data ? user?.toObject() : user?.toObject()[data];
});
