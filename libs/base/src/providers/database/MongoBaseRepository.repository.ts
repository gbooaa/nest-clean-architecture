import mongoose, { Model, Connection, ClientSession } from 'mongoose';
import { BaseAdapter } from './BaseRepository.adapter';
import { OrderTypes } from '@libs/base/enums/app/OrderTypes';
import {
  QueryPaginated,
  getParametersQueryPagination,
  getSortByOrderType,
  paginateQuery,
} from '@libs/base/helpers';

export class MongoBaseRepository<Entity, Create, Edit>
  implements BaseAdapter<Entity, Create, Edit>
{
  private model: Model<Entity>;
  connection: Connection;

  constructor(model: Model<Entity>, connection: Connection = null) {
    this.model = model;
    this.connection = connection;
  }

  async getById(id: string): Promise<Entity> {
    return await this.model.findById(id);
  }

  async getOneByFilter(filter: Partial<Entity>): Promise<Entity> {
    return await this.model.findOne(filter);
  }

  async create(data: Create, transactionObject?: any): Promise<Entity> {
    const newItem = new this.model(data);
    return (await newItem.save({ session: transactionObject })) as Entity;
  }

  async getAll(): Promise<Entity[]> {
    return await this.model.find();
  }

  async getAllByFilter(filter: Partial<Entity>): Promise<Entity[]> {
    return await this.model.find(filter);
  }

  async deleteById(id: string, transactionObject?: any): Promise<Entity> {
    return await this.model.findByIdAndDelete(id, { session: transactionObject });
  }

  async deleteOneByFilter(filter: Partial<Entity>, transactionObject?: any): Promise<Entity> {
    return await this.model.findOneAndDelete(filter, { session: transactionObject });
  }

  async deleteAllByFilter(filter: Partial<Entity>, transactionObject?: any): Promise<any> {
    return await this.model.deleteMany(filter, { session: transactionObject });
  }

  async updateById(id: string, data: Edit, transactionObject?: any): Promise<Entity> {
    return await this.model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      session: transactionObject,
    });
  }

  async updateOneByFilter(
    filter: Partial<Entity>,
    data: Edit,
    transactionObject?: any,
  ): Promise<Entity> {
    return await this.model.findOneAndUpdate(filter, data, {
      new: true,
      session: transactionObject,
    });
  }

  async updateAllByFilter(
    filter: Partial<Entity>,
    data: Edit,
    transactionObject?: any,
  ): Promise<any> {
    return await this.model.updateMany(filter, { $set: data }, { session: transactionObject });
  }

  /**
   * Creates a new session to transact from any repository that extends from this BaseRepository.
   * Before it is necessary to inject the connection in the constructor.
   * @returns Promise<ClientSession>
   */
  async createSession(): Promise<ClientSession> {
    return (await this.connection?.startSession()) || new Promise(null);
  }

  async createPagination<TReturn = any>(
    pipeline: mongoose.PipelineStage[],
    options: {
      page: number;
      items: number;
      orderBy: string;
      defaultOrderBy: string;
      orderType: OrderTypes;
      usePagination: boolean;
    },
  ): Promise<TReturn[] | QueryPaginated<TReturn>> {
    const { defaultOrderBy, items, orderBy, orderType, page, usePagination } = options;

    const { skip, limit, currentPage } = getParametersQueryPagination(page, items);

    const result = await this.model
      .aggregate([
        ...pipeline,
        {
          $sort: {
            [orderBy || defaultOrderBy]: getSortByOrderType(orderType, OrderTypes.asc),
          },
        },
        {
          $facet: {
            list: [...(usePagination ? [{ $skip: skip }, { $limit: limit }] : [])],
            totalItems: [{ $count: 'count' }],
          },
        },
      ])
      .addFields({
        totalItems: {
          $ifNull: [{ $arrayElemAt: ['$totalItems.count', 0] }, 0],
        },
      });

    return usePagination
      ? paginateQuery<TReturn>({
          items: result[0].list,
          totalItems: result[0].totalItems,
          rowsPerPage: limit,
          currentPage: currentPage,
        })
      : result[0].list;
  }
}
