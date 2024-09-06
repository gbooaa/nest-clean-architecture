import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { AppModule } from './app.module';
import { ConfigType } from '@nestjs/config';
import configuration from '@config/config';
import { RestExceptionsFilter } from '@libs/base/filters';
import { TimeoutInterceptor } from '@libs/base/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const configService = app.get<ConfigType<typeof configuration>>(configuration.KEY);

  // Helmet Security
  if (configService.app.ACTIVATE_HELMET_SECURITY) {
    app.use(helmet());
  }

  // CORS activation
  if (configService.app.ACTIVATE_CORS) {
    app.enableCors();
  }

  // Versioning
  if (configService.app.ACTIVATE_VERSIONING) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
  }

  // Global Prefix
  const globalPrefix = `${configService.app.STAGE}/${configService.app.BASE_URL_PATH}`;
  app.setGlobalPrefix(`/${globalPrefix}`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new RestExceptionsFilter());

  // Timeout Interceptor
  if (configService.app.ACTIVATE_TIMEOUT_INTERCEPTOR) {
    app.useGlobalInterceptors(
      new TimeoutInterceptor(configService.app.MILISECONDS_TIMEOUT_INTERCEPTOR),
    );
  }

  if (configService.app.ACTIVATE_SOCKETS_DOCS) {
    // Swagger Docs
    const config = new DocumentBuilder()
      .setTitle(configService.swagger.SWAGGER_DOCS_TITLE)
      .setDescription(configService.swagger.SWAGGER_DOCS_DESCRIPTION)
      .setVersion(configService.swagger.SWAGGER_DOCS_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      `${configService.app.STAGE}/${configService.swagger.SWAGGER_PATH}`,
      app,
      document,
      { swaggerOptions: { filter: true } },
    );

    // Async Sockets Docs
    const asyncApiOptions = new AsyncApiDocumentBuilder()
      .setTitle(configService.sockets.SOCKETS_DOCS_TITLE)
      .setDescription(configService.sockets.SOCKETS_DOCS_DESCRIPTION)
      .setVersion(configService.sockets.SOCKETS_DOCS_VERSION)
      .setDefaultContentType('application/json')
      .addServer('sockets', {
        url: `ws://${configService.app.SERVER_DOMAIN}:${configService.app.PORT}`,
        protocol: 'socket.io',
      })
      .build();

    const asyncapiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions);

    await AsyncApiModule.setup(
      `${configService.app.STAGE}/${configService.sockets.SOCKETS_DOCS_PATH}`,
      app,
      asyncapiDocument,
    );
  }

  // Server APP
  const port = configService.app.PORT;
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
