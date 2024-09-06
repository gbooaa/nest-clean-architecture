import { Model, Connection } from 'mongoose';
import { Genders } from '../models';
import { MongoBaseRepository } from '@libs/base/providers/database';
import { GendersAdapter, GendersCreate, GendersEdit, GendersEntity } from '@domain/genders';

export class GendersRepository
  extends MongoBaseRepository<GendersEntity, GendersCreate, GendersEdit>
  implements GendersAdapter
{
  constructor(
    private readonly gendersModel: Model<Genders>,
    readonly connection: Connection,
  ) {
    super(gendersModel, connection);
  }
}
