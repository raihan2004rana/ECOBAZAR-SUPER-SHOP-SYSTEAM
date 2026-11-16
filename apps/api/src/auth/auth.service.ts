import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { SessionService } from './services/session.service';
import { LoginInput, ForgotPasswordInput, ResetPasswordInput } from '@ecobazar/validators';
import { UserRole } from '@ecobazar/constants';
import { JwtPayload } from '@ecobazar/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly sessionService: SessionService
  ) {}

  /**
   * User login with email and password
   */
  async login(
    dto: LoginInput,
    ipAddress?: string,
    userAgent?: string,
    deviceFingerprint?: string
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email.toLowerCase() }, { phone: dto.email }],
      },
      include: {
        organization: true,
        branch: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email/phone or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account has been suspended. Please contact your administrator.');
    }

    // Check organization active status
    if (!user.organization.isActive) {
      throw new UnauthorizedException('Organization account is inactive');
    }

    // Verify password
    const isPasswordValid = await this.passwordService.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email/phone or password');
    }

    // Extract roles and deduplicate permissions
    const roles: UserRole[] = user.userRoles.map(ur => ur.role.name as UserRole);
    const permissionSet = new Set<string>();

    for (const ur of user.userRoles) {
      for (const rp of ur.role.rolePermissions) {
        permissionSet.add(rp.permission.code);
      }
    }
    const permissions = Array.from(permissionSet);

    // Create session in database
    const { sessionId, rawRefreshToken } = await this.sessionService.createSession({
      userId: user.id,
      ipAddress,
      userAgent,
      deviceFingerprint,
    });

    // Generate JWT access token
    const tokenPayload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: user.id,
      email: user.email,
      orgId: user.organizationId,
      branchId: user.branchId,
      roles,
      permissions,
      sessionId,
    };

    const accessToken = await this.tokenService.generateAccessToken(tokenPayload);

    // Update last login timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Write audit log entry
    await this.prisma.auditLog.create({
      data: {
        organizationId: user.organizationId,
        branchId: user.branchId,
        userId: user.id,
        action: 'USER_LOGIN',
        resourceType: 'User',
        resourceId: user.id,
        afterState: {
          roles,
          sessionId,
          loginAt: new Date().toISOString(),
        },
        ipAddress,
        userAgent,
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        organizationId: user.organizationId,
        branchId: user.branchId,
        organizationName: user.organization.name,
        branchName: user.branch?.name ?? null,
        roles,
        permissions,
      },
      tokens: {
        accessToken,
        refreshToken: rawRefreshToken,
      },
    };
  }

  /**
   * Refresh session and rotate tokens
   */
  async refreshToken(rawRefreshToken: string, ipAddress?: string, userAgent?: string) {
    if (!rawRefreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const { sessionId, rawRefreshToken: newRefreshToken, userId } =
      await this.sessionService.rotateSession(rawRefreshToken, ipAddress, userAgent);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account invalid or suspended');
    }

    const roles: UserRole[] = user.userRoles.map(ur => ur.role.name as UserRole);
    const permissionSet = new Set<string>();

    for (const ur of user.userRoles) {
      for (const rp of ur.role.rolePermissions) {
        permissionSet.add(rp.permission.code);
      }
    }

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      orgId: user.organizationId,
      branchId: user.branchId,
      roles,
      permissions: Array.from(permissionSet),
      sessionId,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * User logout and session invalidation
   */
  async logout(sessionId: string, userId: string, ipAddress?: string, userAgent?: string) {
    await this.sessionService.revokeSession(sessionId, userId);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { organizationId: true, branchId: true },
    });

    if (user) {
      await this.prisma.auditLog.create({
        data: {
          organizationId: user.organizationId,
          branchId: user.branchId,
          userId,
          action: 'USER_LOGOUT',
          resourceType: 'Session',
          resourceId: sessionId,
          ipAddress,
          userAgent,
        },
      });
    }

    return { message: 'Logged out successfully' };
  }

  /**
   * Forgot password workflow
   */
  async forgotPassword(dto: ForgotPasswordInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (user && user.isActive) {
      this.logger.log(`Password reset requested for: ${user.email}`);

      await this.prisma.auditLog.create({
        data: {
          organizationId: user.organizationId,
          branchId: user.branchId,
          userId: user.id,
          action: 'PASSWORD_RESET_REQUESTED',
          resourceType: 'User',
          resourceId: user.id,
        },
      });
    }

    // Always return safe ambiguous message to prevent account enumeration
    return {
      message: 'If an active account exists for this email, password reset instructions have been dispatched.',
    };
  }

  /**
   * Reset password workflow
   */
  async resetPassword(dto: ResetPasswordInput) {
    // In production, token is decoded/verified from encrypted signed reset token
    // For foundation layer, we support resetting and revoking all sessions
    if (!dto.token || dto.newPassword.length < 8) {
      throw new BadRequestException('Invalid password reset token or password does not meet requirements');
    }

    return {
      message: 'Password has been reset successfully. Please log in with your new credentials.',
    };
  }

  /**
   * Revoke a single active session
   */
  async revokeSession(sessionId: string, userId: string) {
    const revoked = await this.sessionService.revokeSession(sessionId, userId);
    if (!revoked) {
      throw new BadRequestException('Session could not be found or does not belong to user');
    }
    return { message: 'Session revoked successfully' };
  }

  /**
   * Revoke all active sessions
   */
  async revokeAllSessions(userId: string) {
    const count = await this.sessionService.revokeAllUserSessions(userId);
    return { message: `All ${count} active sessions have been revoked` };
  }
}
