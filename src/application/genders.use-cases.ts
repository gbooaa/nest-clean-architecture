import { Inject, Injectable } from '@nestjs/common';
import { IDataServices } from '@framework/providers/data.provider';
import { CustomException } from '@libs/base/exceptions';
import { CustomCodes } from '@libs/common/exceptions';
import { handleGeneralExceptionsHelper } from '@libs/base/helpers';
import { GendersCreate, GendersEdit } from '@domain/genders';
import { ConfigType } from '@nestjs/config';
import config from '@config/config';

@Injectable()
export class GendersUseCases {
  constructor(
    private dataServices: IDataServices,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async create(data: GendersCreate) {
    try {
      return await this.dataServices.genders.create(data);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getById(id: string) {
    const gender = await this.dataServices.genders.getById(id);

    if (!gender) {
      throw new CustomException(CustomCodes.genderNotFound);
    }

    return gender;
  }

  async listAll() {
    return await this.dataServices.genders.getAll();
  }

  async update(id: string, data: GendersEdit) {
    const editedGender = await this.dataServices.genders.updateById(id, data);

    if (!editedGender) {
      throw new CustomException(CustomCodes.genderNotFound);
    }

    return editedGender;
  }

  async delete(id: string) {
    const deletedGender = await this.dataServices.genders.deleteById(id);

    // TODO: No se permite eliminar un género si está siendo usado por una película

    if (!deletedGender) {
      throw new CustomException(CustomCodes.genderNotFound);
    }

    return deletedGender;
  }

  private handleDBExceptions(error: any) {
    if (error.code === 11000) {
      throw new CustomException(CustomCodes.genderDuplicated);
    }

    handleGeneralExceptionsHelper(error);
  }
}
