import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Counter {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  number: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
