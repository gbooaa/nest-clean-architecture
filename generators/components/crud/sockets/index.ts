import * as fs from 'fs';
import {
  camelToSnakeCase,
  toCamelCase,
  toKebabCase,
  toPascalCase,
} from '../../common/convertEntityTo.helper';

module.exports = {
  description: 'add new sockets gateway',
  prompts: [
    {
      type: 'input',
      name: 'nameEntity',
      message: 'Gateway Name (singular):',
      validate: function (input) {
        const done = this.async();
        const isEmpty = input.trim() == '';
        if (isEmpty) {
          done('You need to provide a gateway name');
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
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/{{camelCase nameEntity}}s.events.dto.ts',
        templateFile: `./components/crud/sockets/templates/example.dto.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/${entityCamelCase}s.events.dto.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.events.dto.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/{{camelCase nameEntity}}s.types.ts',
        templateFile: `./components/crud/sockets/templates/example.types.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/domain/${entityCamelCase}s/${entityCamelCase}s.types.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.types.ts already exists.`;
          return;
        },
      },
      {
        type: 'add',
        path: '{{destinationPath}}/domain/{{camelCase nameEntity}}s/index.ts',
        templateFile: `./components/crud/sockets/templates/index.domain.ts.hbs`,
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
        templateFile: `./components/crud/sockets/templates/example.use-case.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/application/${entityCamelCase}s.use-cases.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.use-cases.ts already exists.`;
          return;
        },
      },
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
        path: '{{destinationPath}}/infraestructure/events/events.ts',
        pattern: /\/\/ Export your Patterns Events \| Don't remove/g,
        templateFile: './components/crud/sockets/templates/example.events.ts.hbs',
        data: { entityPascalCase },
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/infraestructure/events/index.ts',
        pattern: /\/\/ Add your gateways/g,
        template: `export * from './${entityCamelCase}s.gateway';`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/infraestructure/events/{{camelCase nameEntity}}s.gateway.ts',
        templateFile: `./components/crud/sockets/templates/example.gateway.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/infraestructure/events/${entityCamelCase}s.gateway.ts`;
          if (fs.existsSync(path)) return `Skip: ${entityCamelCase}s.gateway.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/infraestructure/events/docs/index.ts',
        pattern: /\/\/ Add your async docs/g,
        template: `export * from './${entityCamelCase}s.docs.decorator';`,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '{{destinationPath}}/infraestructure/events/docs/{{camelCase nameEntity}}s.docs.decorator.ts',
        templateFile: `./components/crud/sockets/templates/example.docs.decorator.ts.hbs`,
        abortOnFail: true,
        skip(input) {
          const path = `${destinationPath}/infraestructure/events/docs/${entityCamelCase}s.docs.decorator.ts`;
          if (fs.existsSync(path))
            return `Skip: ${entityCamelCase}s.docs.decorator.ts already exists.`;
          return;
        },
      },
      {
        type: 'append',
        path: '{{destinationPath}}/app.module.ts',
        pattern: /\/\/ Add your gateways here \| Don't remove line/g,
        template: `    ${entityPascalCase}sGateway,`,
        abortOnFail: true,
        unique: true,
      },
      {
        type: 'append',
        path: '{{destinationPath}}/app.module.ts',
        pattern: /\/\/ Import Gateways \| Don't remove line/g,
        template: `  ${entityPascalCase}sGateway,`,
        abortOnFail: true,
        unique: true,
      },
    ];

    return actions;
  },
};
