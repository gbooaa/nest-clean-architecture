import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { IDataServices } from '@framework/providers/data.provider';
import { GendersAdapter } from '@domain/genders';

import {
  /* Import Models | Dont remove this comment */
  Genders,
} from './models';

import {
  /* Import Repositories | Dont remove this comment */
  GendersRepository,
} from './repositories';

@Injectable()
export class MongoService implements IDataServices, OnApplicationBootstrap {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    // Inject Models | DON'T REMOVE THIS LINE
    @InjectModel(Genders.name) private gendersModel: Model<Genders>,
  ) {}

  // Add Adapters | DON'T REMOVE THIS LINE
  genders: GendersAdapter;

  onApplicationBootstrap() {
    // Add Repositories Injection | DON'T REMOVE THIS LINE
    this.genders = new GendersRepository(this.gendersModel, this.connection);
  }
}
