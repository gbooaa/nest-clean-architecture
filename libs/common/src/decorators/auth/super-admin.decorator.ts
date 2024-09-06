import { SetMetadata } from '@nestjs/common';

export const META_SUPER_ADMIN = 'isforsuperadmin';

export const SuperAdminProtected = (isSuperAdmin?: boolean) => {
  return SetMetadata(META_SUPER_ADMIN, isSuperAdmin);
};
