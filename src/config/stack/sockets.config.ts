export function SocketsConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Ruta base del servicio de documentación de Sockets
     * @default 'api/sockets'
     * ---------------------------------------------------
     */
    SOCKETS_DOCS_PATH: process.env.SOCKETS_DOCS_PATH || 'api/sockets',

    /**
     * ---------------------------------------------------
     * @description Titulo de la documentación de sockets
     * @default 'Clean Architecture'
     * ---------------------------------------------------
     */
    SOCKETS_DOCS_TITLE: process.env.SOCKETS_DOCS_TITLE || 'Clean Architecture',

    /**
     * ---------------------------------------------------
     * @description Descripción de la documentación de sockets
     * @default 'Documentation for Web-Sockets'
     * ---------------------------------------------------
     */
    SOCKETS_DOCS_DESCRIPTION:
      process.env.SOCKETS_DOCS_DESCRIPTION || 'Documentation for Web-Sockets',

    /**
     * ---------------------------------------------------
     * @description Versión de la documentación de sockets
     * @default '1.0'
     * ---------------------------------------------------
     */
    SOCKETS_DOCS_VERSION: process.env.SOCKETS_DOCS_VERSION || '1.0',
  };
}
