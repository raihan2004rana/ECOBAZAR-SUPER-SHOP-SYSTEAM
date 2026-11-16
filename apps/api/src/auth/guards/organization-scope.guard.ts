import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtPayload, UserRole } from '@ecobazar/types';

@Injectable()
export class OrganizationScopeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: JwtPayload | undefined = request.user;

    if (!user) {
      throw new ForbiddenException('User authentication context missing');
    }

    // Platform Super Admin bypasses single-org boundary
    if (user.roles?.includes('SUPER_ADMIN' as UserRole)) {
      return true;
    }

    const targetOrgId =
      request.params?.organizationId ||
      request.query?.organizationId ||
      request.body?.organizationId ||
      request.headers['x-organization-id'];

    if (targetOrgId && targetOrgId !== user.orgId) {
      throw new ForbiddenException(
        `Cross-organization access forbidden: Access denied for organization '${targetOrgId}'`
      );
    }

    return true;
  }
}
