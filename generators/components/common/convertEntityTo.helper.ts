export const toKebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const toCamelCase = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

export const toPascalCase = (str) =>
  str
    .replace(/([A-Z])/g, '$1')
    .charAt(0)
    .toUpperCase() + str.replace(/([A-Z])/g, '$1').slice(1);

export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
