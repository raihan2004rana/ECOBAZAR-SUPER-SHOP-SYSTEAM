import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { SessionService } from './services/session.service';
import { PrismaService } from '../prisma/prisma.service';
import { USER_ROLES } from '@ecobazar/constants';

describe('AuthService (Unit Tests)', () => {
  let authService: AuthService;
  let sessionService: SessionService;
  let passwordService: PasswordService;
  let tokenService: TokenService;
  let prismaService: any;

  const mockUser = {
    id: 'usr-1111-2222',
    email: 'manager.dhk01@ecobazar.dev',
    phone: '+8801700000003',
    passwordHash: '$2a$12$someValidHashedPassword',
    firstName: 'Kabir',
    lastName: 'Hossain',
    organizationId: 'org-root-0001',
    branchId: 'br-dhk-0001',
    isActive: true,
    organization: {
      id: 'org-root-0001',
      name: 'ECOBAZAR Supermarket Ltd.',
      isActive: true,
    },
    branch: {
      id: 'br-dhk-0001',
      name: 'Dhanmondi Branch #01',
    },
    userRoles: [
      {
        role: {
          name: USER_ROLES.BRANCH_MANAGER,
          rolePermissions: [
            { permission: { code: 'inventory:read' } },
            { permission: { code: 'pos:checkout' } },
          ],
        },
      },
    ],
  };

  beforeEach(async () => {
    prismaService = {
      user: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      session: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      auditLog: {
        create: jest.fn().mockResolvedValue({}),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PasswordService,
        {
          provide: TokenService,
          useValue: {
            generateAccessToken: jest.fn().mockResolvedValue('mock-jwt-access-token'),
            generateRefreshToken: jest.fn().mockReturnValue('mock-raw-refresh-token'),
            hashToken: jest.fn((token: string) => `hashed-${token}`),
            verifyAccessToken: jest.fn(),
          },
        },
        SessionService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    sessionService = module.get<SessionService>(SessionService);
    passwordService = module.get<PasswordService>(PasswordService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('1. Successful Login', () => {
    it('should authenticate user with valid credentials and return access + refresh tokens', async () => {
      prismaService.user.findFirst.mockResolvedValue(mockUser);
      jest.spyOn(passwordService, 'compare').mockResolvedValue(true);
      prismaService.session.create.mockResolvedValue({
        id: 'ses-1234',
        userId: mockUser.id,
        isRevoked: false,
      });

      const result = await authService.login(
        { email: 'manager.dhk01@ecobazar.dev', password: 'ValidPassword123!' },
        '127.0.0.1',
        'Mozilla/5.0'
      );

      expect(result).toBeDefined();
      expect(result.user.email).toBe(mockUser.email);
      expect(result.user.roles).toContain(USER_ROLES.BRANCH_MANAGER);
      expect(result.user.permissions).toContain('inventory:read');
      expect(result.tokens.accessToken).toBe('mock-jwt-access-token');
      expect(result.tokens.refreshToken).toBe('mock-raw-refresh-token');
      expect(prismaService.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ action: 'USER_LOGIN' }),
        })
      );
    });
  });

  describe('2. Invalid Login', () => {
    it('should reject login with wrong password', async () => {
      prismaService.user.findFirst.mockResolvedValue(mockUser);
      jest.spyOn(passwordService, 'compare').mockResolvedValue(false);

      await expect(
        authService.login(
          { email: 'manager.dhk01@ecobazar.dev', password: 'WrongPassword' },
          '127.0.0.1'
        )
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should reject login for non-existent user email', async () => {
      prismaService.user.findFirst.mockResolvedValue(null);

      await expect(
        authService.login(
          { email: 'unknown@ecobazar.dev', password: 'Password123' },
          '127.0.0.1'
        )
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should reject login for deactivated user account', async () => {
      prismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      await expect(
        authService.login(
          { email: 'manager.dhk01@ecobazar.dev', password: 'ValidPassword123!' },
          '127.0.0.1'
        )
      ).rejects.toThrow('Account has been suspended');
    });
  });

  describe('3. Token Refresh & Rotation', () => {
    it('should rotate refresh token and issue new access token', async () => {
      const validSession = {
        id: 'ses-active-01',
        userId: mockUser.id,
        refreshTokenHash: 'hashed-old-token',
        isRevoked: false,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day in future
        user: { ...mockUser },
      };

      prismaService.session.findFirst.mockResolvedValue(validSession);
      prismaService.session.update.mockResolvedValue({});
      prismaService.session.create.mockResolvedValue({ id: 'ses-active-02' });
      prismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await authService.refreshToken('old-token');

      expect(result.accessToken).toBe('mock-jwt-access-token');
      expect(result.refreshToken).toBe('mock-raw-refresh-token');
      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'ses-active-01' },
        data: { isRevoked: true },
      });
    });
  });

  describe('4. Token Reuse Detection (Security Breach)', () => {
    it('should detect reuse of revoked token, revoke all sessions, and reject with security alert', async () => {
      const revokedSession = {
        id: 'ses-stolen-01',
        userId: mockUser.id,
        refreshTokenHash: 'hashed-stolen-token',
        isRevoked: true, // Already revoked!
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        user: { ...mockUser },
      };

      prismaService.session.findFirst.mockResolvedValue(revokedSession);
      prismaService.session.updateMany.mockResolvedValue({ count: 5 });

      await expect(sessionService.rotateSession('stolen-token')).rejects.toThrow(
        'Security alert: Token reuse detected. Please log in again.'
      );

      // Verify all sessions were revoked
      expect(prismaService.session.updateMany).toHaveBeenCalledWith({
        where: { userId: mockUser.id, isRevoked: false },
        data: { isRevoked: true },
      });
    });
  });

  describe('5. Expired Session Handling', () => {
    it('should reject refresh token if session has expired', async () => {
      const expiredSession = {
        id: 'ses-expired-01',
        userId: mockUser.id,
        refreshTokenHash: 'hashed-expired-token',
        isRevoked: false,
        expiresAt: new Date(Date.now() - 1000 * 60), // In the past
        user: { ...mockUser },
      };

      prismaService.session.findFirst.mockResolvedValue(expiredSession);

      await expect(sessionService.rotateSession('expired-token')).rejects.toThrow(
        'Refresh token has expired'
      );
    });
  });

  describe('6. Session Revocation & Logout', () => {
    it('should revoke single session on logout', async () => {
      prismaService.session.findUnique.mockResolvedValue({
        id: 'ses-active-01',
        userId: mockUser.id,
      });
      prismaService.session.update.mockResolvedValue({});
      prismaService.user.findUnique.mockResolvedValue({
        organizationId: mockUser.organizationId,
        branchId: mockUser.branchId,
      });

      const result = await authService.logout('ses-active-01', mockUser.id);
      expect(result.message).toBe('Logged out successfully');
      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'ses-active-01' },
        data: { isRevoked: true },
      });
    });

    it('should revoke all user sessions upon request', async () => {
      prismaService.session.updateMany.mockResolvedValue({ count: 3 });

      const result = await authService.revokeAllSessions(mockUser.id);
      expect(result.message).toBe('All 3 active sessions have been revoked');
    });
  });
});
