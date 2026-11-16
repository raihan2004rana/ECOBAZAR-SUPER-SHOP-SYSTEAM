import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@ecobazar/constants';

export const ROLES_KEY = 'roles';
export const RequireRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
