import { handleGeneralExceptionsHelper } from '@libs/base/helpers';
import { Model } from 'mongoose';
import { Counter } from '../models';

export class CounterRepository {
  private model: Model<Counter>;

  constructor(model: Model<Counter>) {
    this.model = model;
  }

  async createCounter(name: string, initialNumber = 1) {
    try {
      const newCounter = new this.model({ name, number: initialNumber });

      await newCounter.save();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getCounter(name: string) {
    const counter = await this.model.findOneAndUpdate({ name }, { $inc: { number: 1 } });

    if (!counter) {
      throw new Error(`${name} counter doesn't exist`);
    }

    return counter.number;
  }

  private handleDBExceptions(error: any) {
    if (error.code === 11000) return;

    handleGeneralExceptionsHelper(error);
  }
}
