import { Transform } from 'class-transformer';

export function ConditionalTransformArray(transformFn: (value: any, obj: any) => any) {
  return Transform(({ value, obj }) => {
    if (!value) return undefined;
    if (Array.isArray(value)) {
      const transformed = value
        .map((item) => transformFn(item, obj))
        .filter((item) => item !== undefined);
      return transformed.length > 0 ? transformed : undefined;
    }
    return transformFn(value, obj);
  });
}
