import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '@libs/base/middleware';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ConfigSchema } from '@config/config.schema';
import { ApplicationLayerModule } from '@application/application.module';
import { ProvidersModule } from '@framework/providers/providers.module';
import { CacheModule } from '@nestjs/cache-manager';
import config from '@config/config';

import {
  // Import Controllers | Don't remove line
  GendersController,
} from '@infraestructure/controllers';

import {
  // Import Gateways | Don't remove line
} from '@infraestructure/events';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: ConfigSchema,
    }),

    // Mongo DB
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          uri: configService.mongo.MONGO_URL,
        };
      },
    }),

    // Cache Module
    CacheModule.register({
      isGlobal: true,
      max: 20,
    }),

    // Local Providers
    ProvidersModule,
    ApplicationLayerModule,
  ],
  controllers: [
    // Add your controllers here | Don't remove line
    GendersController,
  ],
  providers: [
    // Add your gateways here | Don't remove line
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
