import { Module } from '@nestjs/common';
import { MongoModule } from '@framework/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  exports: [MongoModule],
})
export class ProvidersModule {}
