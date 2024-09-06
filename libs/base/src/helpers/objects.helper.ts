type DataSelectSchema<T> = {
  [K in keyof T]?: 0 | 1;
};

export const selectObjectDataFromSchema = <T>(
  object: T,
  schema: DataSelectSchema<T>,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const clave in schema) {
    if (schema.hasOwnProperty(clave) && schema[clave]) {
      const keys = Object.keys(schema[clave] || {});

      if (typeof schema[clave] === 'object' && keys.length) {
        result[clave] = {} as any;

        keys.forEach((key) => {
          result[clave][key] = object[clave][key];
        });

        continue;
      }

      result[clave] = object[clave];
    }
  }

  return result;
};

export const hasProperties = (obj: object) => Object.keys(obj).length > 0;
