import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IDataServices } from '@framework/providers/data.provider';
import { MongoService } from './mongo.service';
import {
  /* Import Models | Dont remove this comment */
  Genders,
  GendersSchema,
} from './models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      // Add Mongo Models and Schemas | DON'T REMOVE THIS LINE
      {
        name: Genders.name,
        useFactory() {
          return GendersSchema;
        },
      },
    ]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoService,
    },
  ],
  exports: [IDataServices],
})
export class MongoModule {}
