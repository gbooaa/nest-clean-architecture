export function SwaggerConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Ruta base del servicio de documentación de Swagger
     * @default 'api/docs'
     * ---------------------------------------------------
     */
    SWAGGER_PATH: process.env.SWAGGER_PATH || 'api/docs',

    /**
     * ---------------------------------------------------
     * @description Titulo del servicio de documentación de Swagger
     * @default 'Clean Architecture'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_TITLE: process.env.SWAGGER_DOCS_TITLE || 'Clean Architecture',

    /**
     * ---------------------------------------------------
     * @description Descripción del servicio de documentación de Swagger
     * @default 'Api documentation for development'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_DESCRIPTION:
      process.env.SWAGGER_DOCS_DESCRIPTION || 'Api documentation for development',

    /**
     * ---------------------------------------------------
     * @description Versión del servicio de documentación de Swagger
     * @default '1.0'
     * ---------------------------------------------------
     */
    SWAGGER_DOCS_VERSION: process.env.SWAGGER_DOCS_VERSION || '1.0',
  };
}
