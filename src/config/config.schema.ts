import * as Joi from 'joi';
import { Environments } from './environments';
import { MixedConfigsForEnvFile } from './config.types';

/** .env file schema validation */
export const ConfigSchema = Joi.object<MixedConfigsForEnvFile>({
  STAGE: Joi.string()
    .valid(...Object.keys(Environments))
    .optional(),

  PORT: Joi.number().integer().optional(),

  BASE_URL_PATH: Joi.string().optional(),

  SERVER_DOMAIN: Joi.string().optional(),

  ACTIVATE_HELMET_SECURITY: Joi.boolean().optional(),

  ACTIVATE_VERSIONING: Joi.boolean().optional(),

  ACTIVATE_CORS: Joi.boolean().optional(),

  ACTIVATE_SOCKETS_DOCS: Joi.boolean().optional(),

  MONGO_URL: Joi.string().optional(),

  SOCKETS_DOCS_PATH: Joi.string().optional(),

  SOCKETS_DOCS_DESCRIPTION: Joi.string().optional(),

  SOCKETS_DOCS_TITLE: Joi.string().optional(),

  SOCKETS_DOCS_VERSION: Joi.string().optional(),

  SWAGGER_PATH: Joi.string().optional(),

  SWAGGER_DOCS_DESCRIPTION: Joi.string().optional(),

  SWAGGER_DOCS_TITLE: Joi.string().optional(),

  SWAGGER_DOCS_VERSION: Joi.string().optional(),

  ACTIVATE_TIMEOUT_INTERCEPTOR: Joi.boolean().optional(),

  MILISECONDS_TIMEOUT_INTERCEPTOR: Joi.number().integer().positive().optional(),
});
