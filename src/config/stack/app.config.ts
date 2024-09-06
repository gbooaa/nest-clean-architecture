import { Environments } from '../environments';
import { stringToBoolean } from '@libs/base/helpers';

export function AppConfig() {
  return {
    /**
     * ---------------------------------------------------
     * @description Ambiente donde se encuentra el aplicativo
     * @default 'local'
     * ---------------------------------------------------
     */
    STAGE: process.env.STAGE || Environments.local,

    /**
     * ---------------------------------------------------
     * @description Puerto donde se expondrá el servicio principal
     * @default 3000
     * ---------------------------------------------------
     */
    PORT: Number(process.env.PORT) || 3000,

    /**
     * ---------------------------------------------------
     * @description Dominio del servidor
     * @default 'localhost'
     * ---------------------------------------------------
     */
    SERVER_DOMAIN: process.env.SERVER_DOMAIN || 'localhost',

    /**
     * ---------------------------------------------------
     * @description Ruta base donde se expone la API
     * @default 'api/v1'
     * ---------------------------------------------------
     */
    BASE_URL_PATH: process.env.BASE_PATH || 'api',

    /**
     * ---------------------------------------------------
     * @description Activar seguridad de la API con Helmet
     * @todo IMPORTANTE actvar en Producción
     * @default false
     * ---------------------------------------------------
     */
    ACTIVATE_HELMET_SECURITY: process.env.ACTIVATE_HELMET_SECURITY
      ? stringToBoolean(process.env.ACTIVATE_HELMET_SECURITY)
      : false,

    /**
     * ---------------------------------------------------
     * @description Activar versionamiento de la API
     * @default true
     * ---------------------------------------------------
     */
    ACTIVATE_VERSIONING: process.env.ACTIVATE_VERSIONING
      ? stringToBoolean(process.env.ACTIVATE_VERSIONING)
      : true,

    /**
     * ---------------------------------------------------
     * @description Activar CORS para el servicio de backend
     * @default true
     * ---------------------------------------------------
     */
    ACTIVATE_CORS: process.env.ACTIVATE_CORS ? stringToBoolean(process.env.ACTIVATE_CORS) : true,

    /**
     * ---------------------------------------------------
     * @description Activar Interceptor que permite enviar una excepción en caso de que
     * la petición exceda un límite de tiempo definido en milisegundos.
     * @default true
     * ---------------------------------------------------
     */
    ACTIVATE_TIMEOUT_INTERCEPTOR: process.env.ACTIVATE_TIMEOUT_INTERCEPTOR
      ? stringToBoolean(process.env.ACTIVATE_TIMEOUT_INTERCEPTOR)
      : true,

    /**
     * ---------------------------------------------------
     * @description Activar documentación de swagger
     * @default true
     * ---------------------------------------------------
     */
    ACTIVATE_SOCKETS_DOCS: process.env.ACTIVATE_SOCKETS_DOCS
      ? stringToBoolean(process.env.ACTIVATE_SOCKETS_DOCS)
      : true,

    /**
     * ---------------------------------------------------
     * @description Cantidad de milisegundos que debe esperar el servicio para responder.
     * En caso de que se termine el contador y no se haya mandado respuesta, se manda una excepción
     * @important Es necesario tener activada la variable de entorno `ACTIVATE_TIMEOUT_INTERCEPTOR`
     * @default true
     * ---------------------------------------------------
     */
    MILISECONDS_TIMEOUT_INTERCEPTOR: Number(process.env.MILISECONDS_TIMEOUT_INTERCEPTOR) || 600000,
  };
}
