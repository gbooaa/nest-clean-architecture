import { BaseAdapter } from '@libs/base/providers/database';
import {
  GendersEntity,
  GendersCreate,
  GendersEdit,
} from './genders.entity';

export abstract class GendersAdapter extends BaseAdapter<
  GendersEntity,
  GendersCreate,
  GendersEdit
> {}
