import { AppConfig, MongoConfig, SocketsConfig, SwaggerConfig } from './stack';

export type MixedConfigsForEnvFile =
  | ReturnType<typeof AppConfig>
  | ReturnType<typeof MongoConfig>
  | ReturnType<typeof SocketsConfig>
  | ReturnType<typeof SwaggerConfig>;
