import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseMongoIdPipe } from '@libs/base/pipes';
import { GendersUseCases } from '@application/genders.use-cases';
import { CreateGenderDTO, UpdateGenderDTO } from '@domain/genders';
import { GendersDocs } from './docs';

@Controller('genders')
@ApiTags('Genders')
export class GendersController {
  constructor(private readonly gendersUseCases: GendersUseCases) {}

  @Post()
  @GendersDocs('create')
  create(@Body() createGendersData: CreateGenderDTO) {
    return this.gendersUseCases.create(createGendersData);
  }

  @Get(':id')
  @GendersDocs('getById')
  getById(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.gendersUseCases.getById(id);
  }

  @Get()
  @GendersDocs('list')
  list() {
    return this.gendersUseCases.listAll();
  }

  @Patch(':id')
  @GendersDocs('update')
  update(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() updateGendersData: UpdateGenderDTO,
  ) {
    return this.gendersUseCases.update(id, updateGendersData);
  }

  @Delete(':id')
  @GendersDocs('delete')
  delete(@Param('id', new ParseMongoIdPipe()) id: string) {
    return this.gendersUseCases.delete(id);
  }
}
