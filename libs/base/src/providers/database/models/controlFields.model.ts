import { allBaseControlFields } from '@libs/base/interfaces';
import { Prop } from '@nestjs/mongoose';

export class ControlFields implements allBaseControlFields {
  @Prop({
    required: false,
    default: false,
  })
  deleted: boolean;

  @Prop({
    required: false,
    default: null,
  })
  deletedAt: string;

  createdAt: string;
  updatedAt: string;
}
