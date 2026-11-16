import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { BranchScopeGuard } from './branch-scope.guard';
import { OrganizationScopeGuard } from './organization-scope.guard';
import { RolesGuard } from './roles.guard';
import { TokenService } from '../services/token.service';
import { USER_ROLES } from '@ecobazar/constants';
import { JwtPayload } from '@ecobazar/types';

describe('Auth & RBAC Guards (Unit Tests)', () => {
  let reflector: Reflector;

  const createMockContext = (requestData: any): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => requestData,
        getResponse: () => ({}),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  };

  beforeEach(() => {
    reflector = new Reflector();
  });

  describe('1. JwtAuthGuard (Unauthorized Requests)', () => {
    it('should throw UnauthorizedException when no Authorization header or token is provided', async () => {
      const tokenService = {} as TokenService;
      const prismaService = {} as any;
      const guard = new JwtAuthGuard(tokenService, prismaService);

      const context = createMockContext({ headers: {} });

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException('Authentication token is required')
      );
    });

    it('should throw UnauthorizedException when token signature is invalid', async () => {
      const tokenService = {
        verifyAccessToken: jest.fn().mockRejectedValue(new Error('Invalid signature')),
      } as unknown as TokenService;
      const prismaService = {} as any;
      const guard = new JwtAuthGuard(tokenService, prismaService);

      const context = createMockContext({
        headers: { authorization: 'Bearer invalid.fake.token' },
      });

      await expect(guard.canActivate(context)).rejects.toThrow(
        new UnauthorizedException('Invalid or expired authentication token')
      );
    });
  });

  describe('2. PermissionsGuard (Permission Denial & Elevation)', () => {
    it('should allow request if user holds the required permission', () => {
      const guard = new PermissionsGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['inventory.read']);

      const mockUser: Partial<JwtPayload> = {
        sub: 'usr-1',
        roles: [USER_ROLES.STAFF],
        permissions: ['inventory.read', 'catalog.read'],
      };

      const context = createMockContext({ user: mockUser });
      expect(guard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException if user lacks required permission', () => {
      const guard = new PermissionsGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['orders.manage']);

      const mockUser: Partial<JwtPayload> = {
        sub: 'usr-1',
        roles: [USER_ROLES.CASHIER],
        permissions: ['pos.checkout', 'catalog.read'], // Missing orders.manage
      };

      const context = createMockContext({ user: mockUser });
      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow Super Admin to bypass permission checks automatically', () => {
      const guard = new PermissionsGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['settings.manage']);

      const superAdminUser: Partial<JwtPayload> = {
        sub: 'usr-admin',
        roles: [USER_ROLES.SUPER_ADMIN],
        permissions: [], // Even with empty permissions
      };

      const context = createMockContext({ user: superAdminUser });
      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('3. RolesGuard (Role-Based Authorization)', () => {
    it('should deny access if user does not hold the required role', () => {
      const guard = new RolesGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([USER_ROLES.OWNER]);

      const cashierUser: Partial<JwtPayload> = {
        sub: 'usr-cashier',
        roles: [USER_ROLES.CASHIER],
      };

      const context = createMockContext({ user: cashierUser });
      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should permit access if user holds matching role', () => {
      const guard = new RolesGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([
        USER_ROLES.BRANCH_MANAGER,
        USER_ROLES.OWNER,
      ]);

      const managerUser: Partial<JwtPayload> = {
        sub: 'usr-mgr',
        roles: [USER_ROLES.BRANCH_MANAGER],
      };

      const context = createMockContext({ user: managerUser });
      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('4. BranchScopeGuard (Branch Access Restrictions)', () => {
    it('should deny Branch Manager from accessing a different branch', () => {
      const guard = new BranchScopeGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const branchManager: Partial<JwtPayload> = {
        sub: 'usr-mgr-dhk01',
        roles: [USER_ROLES.BRANCH_MANAGER],
        branchId: 'br-dhanmondi-01',
      };

      // Attempting to query Gulshan branch (br-gulshan-02)
      const context = createMockContext({
        user: branchManager,
        params: { branchId: 'br-gulshan-02' },
        headers: {},
      });

      expect(() => guard.canActivate(context)).toThrow(
        "Access denied: You are scoped exclusively to branch 'br-dhanmondi-01' and cannot access 'br-gulshan-02'"
      );
    });

    it('should permit Branch Manager to access their own assigned branch', () => {
      const guard = new BranchScopeGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const branchManager: Partial<JwtPayload> = {
        sub: 'usr-mgr-dhk01',
        roles: [USER_ROLES.BRANCH_MANAGER],
        branchId: 'br-dhanmondi-01',
      };

      const context = createMockContext({
        user: branchManager,
        params: { branchId: 'br-dhanmondi-01' },
        headers: {},
      });

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should allow Owner or Super Admin to access any branch organization-wide', () => {
      const guard = new BranchScopeGuard(reflector);
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const owner: Partial<JwtPayload> = {
        sub: 'usr-owner',
        roles: [USER_ROLES.OWNER],
        branchId: null, // Org-wide unconstrained
      };

      const context = createMockContext({
        user: owner,
        params: { branchId: 'br-gulshan-02' },
        headers: {},
      });

      expect(guard.canActivate(context)).toBe(true);
    });
  });

  describe('5. OrganizationScopeGuard (Cross-Organization Denial)', () => {
    it('should deny request attempting to access another organization', () => {
      const guard = new OrganizationScopeGuard();

      const user: Partial<JwtPayload> = {
        sub: 'usr-1',
        orgId: 'org-ecobazar-001',
        roles: [USER_ROLES.OWNER],
      };

      // Attacker trying to target different org
      const context = createMockContext({
        user,
        headers: { 'x-organization-id': 'org-competitor-999' },
      });

      expect(() => guard.canActivate(context)).toThrow(
        "Cross-organization access forbidden: Access denied for organization 'org-competitor-999'"
      );
    });

    it('should permit request targeting the users owning organization', () => {
      const guard = new OrganizationScopeGuard();

      const user: Partial<JwtPayload> = {
        sub: 'usr-1',
        orgId: 'org-ecobazar-001',
        roles: [USER_ROLES.BRANCH_MANAGER],
      };

      const context = createMockContext({
        user,
        headers: { 'x-organization-id': 'org-ecobazar-001' },
      });

      expect(guard.canActivate(context)).toBe(true);
    });
  });
});
