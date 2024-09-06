import { ClientSession } from 'mongoose';

export abstract class BaseAdapter<Entity, Create, Edit> {
  abstract getById(id: string): Promise<Entity>;

  abstract getOneByFilter(filter: Partial<Entity>): Promise<Entity>;

  abstract create(data: Create, transactionObject?: any): Promise<Entity>;

  abstract getAll(): Promise<Entity[]>;

  abstract getAllByFilter(filter: Partial<Entity>): Promise<Entity[]>;

  abstract updateById(id: string, data: Edit, transactionObject?: any): Promise<any>;

  abstract deleteById(id: string, transactionObject?: any): Promise<Entity>;

  abstract deleteOneByFilter(filter: Partial<Entity>, transactionObject?: any): Promise<Entity>;

  abstract deleteAllByFilter(filter: Partial<Entity>, transactionObject?: any): Promise<any>;

  abstract createSession(): Promise<ClientSession>;

  abstract updateOneByFilter(
    filter: Partial<Entity>,
    data: Edit,
    transactionObject?: any,
  ): Promise<Entity>;

  abstract updateAllByFilter(
    filter: Partial<Entity>,
    data: Edit,
    transactionObject?: any,
  ): Promise<any>;
}
