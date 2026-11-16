import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@ecobazar/constants';
import { ROLES_KEY } from '../decorators/require-roles.decorator';
import { JwtPayload } from '@ecobazar/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload | undefined = request.user;

    if (!user || !user.roles) {
      throw new ForbiddenException('Access denied: No role assigned to user');
    }

    // Super Admin has automatic platform-wide role authorization
    if (user.roles.includes('SUPER_ADMIN' as UserRole)) {
      return true;
    }

    const hasRole = requiredRoles.some(role => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: Required role [${requiredRoles.join(', ')}] not held by user`
      );
    }

    return true;
  }
}
