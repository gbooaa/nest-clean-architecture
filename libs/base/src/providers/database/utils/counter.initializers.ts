import { Model, Schema } from 'mongoose';
import { Counter } from '@libs/base/providers/database/models';
import { CounterRepository } from '@libs/base/providers/database/repositories';

export const initializeCounterDBRegisters = <TModel>(
  schema: Schema<TModel>,
  field: keyof TModel,
  nameOfCounter: string,
  counterModel: Model<Counter>,
) => {
  const parsedField = field.toString();

  const counter = new CounterRepository(counterModel);

  counter.createCounter(nameOfCounter);

  schema.pre<TModel>('save', async function (next) {
    this[parsedField] = await counter.getCounter(nameOfCounter);

    next();
  });

  schema.pre<TModel>('insertMany', async function (next, docs) {
    await Promise.all(
      docs.map(async function (doc, index) {
        doc[parsedField] = await counter.getCounter(nameOfCounter);
      }),
    );

    next();
  });
};
