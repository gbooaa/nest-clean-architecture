import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

export const GeneralValidators = (
  extensions: string = '.(jpg|jpeg|png|webp)',
  maxSize: number = 1000000,
) => {
  return [
    new FileTypeValidator({ fileType: extensions }),
    new MaxFileSizeValidator({
      maxSize,
      message: 'The image must not exceed 1Mb',
    }),
  ];
};
