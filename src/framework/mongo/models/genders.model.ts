import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'genders' })
export class Genders {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;
}

export const GendersSchema = SchemaFactory.createForClass(Genders).set(
  'versionKey',
  false,
);
