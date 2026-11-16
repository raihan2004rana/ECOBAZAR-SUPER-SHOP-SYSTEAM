import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BRANCH_SCOPE_KEY } from '../decorators/require-branch-scope.decorator';
import { JwtPayload, UserRole } from '@ecobazar/types';

@Injectable()
export class BranchScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isBranchScopeRequired = this.reflector.getAllAndOverride<boolean>(
      BRANCH_SCOPE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!isBranchScopeRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload | undefined = request.user;

    if (!user) {
      throw new ForbiddenException('User authentication context missing');
    }

    // Platform Super Admin or Organization Owner with unconstrained branch access
    if (
      user.roles.includes('SUPER_ADMIN' as UserRole) ||
      (user.roles.includes('OWNER' as UserRole) && !user.branchId)
    ) {
      return true;
    }

    // Determine target branchId from params, query, or body
    const targetBranchId =
      request.params?.branchId ||
      request.query?.branchId ||
      request.body?.branchId ||
      request.headers['x-branch-id'];

    // If the endpoint does not target any specific branch, but user is branch-scoped,
    // automatically attach user.branchId to query/body to enforce scoping!
    if (!targetBranchId) {
      if (user.branchId) {
        request.branchId = user.branchId;
        if (request.query) request.query.branchId = user.branchId;
        return true;
      }
      return true;
    }

    // User is branch-scoped: target branch must match user's assigned branch
    if (user.branchId && user.branchId !== targetBranchId) {
      throw new ForbiddenException(
        `Access denied: You are scoped exclusively to branch '${user.branchId}' and cannot access '${targetBranchId}'`
      );
    }

    return true;
  }
}
