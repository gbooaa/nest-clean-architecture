import * as fs from 'fs';
import {
  camelToSnakeCase,
  toCamelCase,
  toKebabCase,
  toPascalCase,
} from '../../common/convertEntityTo.helper';

module.exports = {
  description: 'add new crud',
  prompts: [
    {
      type: 'input',
      name: 'nameEntity',
      message: 'Entity Name (singular):',
      validate: function (input) {
        const done = this.async();
        const isEmpty = input.trim() == '';
        if (isEmpty) {
          done('You need to provide a entity name');
        }
        return done(null, true);
      },
    },
    {
      type: 'input',
      name: 'destinationPath',
      message: 'Source (src) folder path:',
      validate: function (input) {
        const done = this.async();
        const isEmpty = input.trim() == '';
        if (isEmpty) {
          done('You need to provide src folder path');
        }
        return done(null, true);
      },
    },
  ],
  actions: (data) => {
    const destinationPath = data.destinationPath;
    const nameEntity = data.nameEntity;

    const entityKebabCase = toKebabCase(nameEntity);
    const entityCamelCase = toCamelCase(entityKebabCase);
    const entityPascalCase = toPascalCase(entityCamelCase);
    const entitySnakeCase = camelToSnakeCase(entityCamelCase);

    const actions: any[] = [
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/{{camelCase nameEntity}}s.entity.ts',
        templateFile: `./components/crud/rest/templates/example.entity.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/${entityCamelCase}s.entity.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.entity.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/{{camelCase nameEntity}}s.adapter.ts',
        templateFile: `./components/crud/rest/templates/example.adapter.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/${entityCamelCase}s.adapter.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.adapter.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/{{camelCase nameEntity}}s.dto.ts',
        templateFile: `./components/crud/rest/templates/example.dto.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/${entityCamelCase}s.dto.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.dto.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/index.ts',
        templateFile: `./components/crud/rest/templates/index.domain.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/index.ts`;
          if (fs.existsSync(path))
            return `Skip: ${destinationPath}/domain/${entityCamelCase}s/index.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/application/{{camelCase nameEntity}}s.use-cases.ts',
        templateFile: `./components/crud/rest/templates/example.use-case.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/application/${entityCamelCase}s.use-cases.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.use-cases.ts already exists.`;
          return;
        },
      },
      // actualización hasta aquí
      {
        type: 'append',
        path: '{{destinationPath}}/application/application.module.ts',
        pattern: /\/\/ Add UseCases Provider \| Don't remove this line/g,
        template: `    ${entityPascalCase}sUseCases,`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/application/application.module.ts',
        pattern: /\/\/ Add UseCases Exports \| Don't remove this line/g,
        template: `    ${entityPascalCase}sUseCases,`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/application/application.module.ts',
        pattern: /(from '@nestjs\/common';)/g,
        template: `import { ${entityPascalCase}sUseCases } from './${entityCamelCase}s.use-cases';`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/../libs/common/src/exceptions/codes.ts',
        pattern: /\/\/ Add custom codes \| Don't remove this line/g,
        template: `  ${entityCamelCase}NotFound = '${entityCamelCase}NotFound',\n  ${entityCamelCase}Duplicated = '${entityCamelCase}Duplicated',`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/../libs/common/src/exceptions/codes.ts',
        pattern: /\/\/ Add custom codes definition \| Don't remove this line/g,
        templateFile: './components/crud/rest/templates/example.customCodesDefinition.ts.hbs',
        data: { entityCamelCase, entityPascalCase },
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/providers/data.provider.ts',
        pattern: /\/\/ Add abstracts \| Don't remove/g,
        template: `  abstract ${entityCamelCase}s: ${entityPascalCase}sAdapter;`,
        abortOnFail: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/providers/data.provider.ts',
        pattern: /\/\/ Add Adapters for data providers \| Don't remove this line/g,
        template: `import { ${entityPascalCase}sAdapter } from '@domain/${entityCamelCase}s';`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/framework/mongo/models/{{camelCase nameEntity}}s.model.ts',
        templateFile: `./components/crud/rest/templates/example.model.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/framework/mongo/models/${entityCamelCase}s.model.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.model.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/models/index.ts',
        pattern: /\/\/ Add models: don't delete/g,
        template: `export * from './${entityCamelCase}s.model';`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/framework/mongo/repositories/{{camelCase nameEntity}}s.repository.ts',
        templateFile: `./components/crud/rest/templates/example.repository.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/framework/mongo/repositories/${entityCamelCase}s.repository.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.repository.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/repositories/index.ts',
        pattern: /\/\/ Add repositories: don't delete/g,
        template: `export * from './${entityCamelCase}s.repository';`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.module.ts',
        pattern: /\/\* Import Models \| Dont remove this comment \*\//g,
        template: `  ${entityPascalCase}s,\n  ${entityPascalCase}sSchema,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.module.ts',
        pattern: /Add Mongo Models and Schemas \| DON'T REMOVE THIS LINE/g,
        templateFile: './components/crud/rest/templates/example.mongoModelModule.ts.hbs',
        data: { entityPascalCase },
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /import { IDataServices } from '@framework\/providers\/data\.provider';/g,
        template: `import { ${entityPascalCase}sAdapter } from '@domain/${entityCamelCase}s';`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /\/\* Import Models \| Dont remove this comment \*\//g,
        template: `  ${entityPascalCase}s,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /\/\* Import Repositories \| Dont remove this comment \*\//g,
        template: `  ${entityPascalCase}sRepository,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /Inject Models \| DON'T REMOVE THIS LINE/g,
        template: `    @InjectModel(${entityPascalCase}s.name) private ${entityCamelCase}sModel: Model<${entityPascalCase}s>,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /Add Adapters \| DON'T REMOVE THIS LINE/g,
        template: `  ${entityCamelCase}s: ${entityPascalCase}sAdapter;`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/framework/mongo/mongo.service.ts',
        pattern: /Add Repositories Injection \| DON'T REMOVE THIS LINE/g,
        template: `    this.${entityCamelCase}s = new ${entityPascalCase}sRepository(this.${entityCamelCase}sModel, this.connection);`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/infraestructure/controllers/{{camelCase nameEntity}}s.controller.ts',
        templateFile: `./components/crud/rest/templates/example.controller.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/infraestructure/controllers/${entityCamelCase}s.controller.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.controller.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/infraestructure/controllers/index.ts',
        pattern: /\/\/ Add your controllers/g,
        template: `export * from './${entityCamelCase}s.controller';`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/infraestructure/controllers/docs/{{camelCase nameEntity}}s.docs.decorator.ts',
        templateFile: `./components/crud/rest/templates/example.docs.decorator.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/infraestructure/controllers/docs/${entityCamelCase}s.docs.decorator.ts`;
          if (fs.existsSync(path))
            return `Skip: ${entityCamelCase}s.docs.decorator.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/infraestructure/controllers/docs/index.ts',
        pattern: /\/\/ Add your swagger docs/g,
        template: `export * from './${entityCamelCase}s.docs.decorator';`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/app.module.ts',
        pattern: /\/\/ Add your controllers here \| Don't remove line/g,
        template: `    ${entityPascalCase}sController,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/app.module.ts',
        pattern: /\/\/ Import Controllers \| Don't remove line/g,
        template: `  ${entityPascalCase}sController,`,
        abortOnFail: true,
        unique: true,
      },
    ];

    return actions;
  },
};
