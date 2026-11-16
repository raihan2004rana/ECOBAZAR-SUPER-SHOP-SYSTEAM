import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { JwtPayload, UserRole } from '@ecobazar/types';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload | undefined = request.user;

    if (!user || !user.permissions) {
      throw new ForbiddenException('Access denied: User possesses no permissions');
    }

    // Super Admin has universal platform permission
    if (user.roles?.includes('SUPER_ADMIN' as UserRole)) {
      return true;
    }

    // All required permissions must be present
    const hasAllPermissions = requiredPermissions.every(permission =>
      user.permissions.includes(permission)
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        `Access denied: Missing required permission(s) [${requiredPermissions.join(', ')}]`
      );
    }

    return true;
  }
}
