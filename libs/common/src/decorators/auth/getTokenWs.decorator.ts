import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Socket } from 'socket.io';

export const GetTokenWs = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToWs();

  const client = request.getClient<Socket>();
  const authorizationHeader = client.handshake.headers?.authorization;

  return authorizationHeader ?? null;
});
