import { registerAs } from '@nestjs/config';
import { AppConfig, MongoConfig, SocketsConfig, SwaggerConfig } from './stack';

export default registerAs('config', () => {
  return {
    app: AppConfig(),
    sockets: SocketsConfig(),
    swagger: SwaggerConfig(),
    mongo: MongoConfig(),
  };
});
