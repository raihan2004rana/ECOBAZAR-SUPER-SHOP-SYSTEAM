import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenService } from './token.service';

export interface CreateSessionOptions {
  userId: string;
  ipAddress?: string;
  userAgent?: string;
  deviceFingerprint?: string;
}

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);
  private readonly sessionDurationDays = 7;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  /**
   * Create a new refresh session and return the raw refresh token
   */
  async createSession(options: CreateSessionOptions): Promise<{ sessionId: string; rawRefreshToken: string }> {
    const rawRefreshToken = this.tokenService.generateRefreshToken();
    const refreshTokenHash = this.tokenService.hashToken(rawRefreshToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.sessionDurationDays);

    const session = await this.prisma.session.create({
      data: {
        userId: options.userId,
        refreshTokenHash,
        ipAddress: options.ipAddress,
        userAgent: options.userAgent,
        deviceFingerprint: options.deviceFingerprint,
        isRevoked: false,
        expiresAt,
      },
    });

    return {
      sessionId: session.id,
      rawRefreshToken,
    };
  }

  /**
   * Rotate a refresh token:
   * 1. Check if token hash exists.
   * 2. If exists but isRevoked = true: SECURITY BREACH! Revoke all sessions for user!
   * 3. If valid: mark current session revoked/rotated and issue new token.
   */
  async rotateSession(
    rawRefreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ sessionId: string; rawRefreshToken: string; userId: string }> {
    const tokenHash = this.tokenService.hashToken(rawRefreshToken);

    const session = await this.prisma.session.findFirst({
      where: { refreshTokenHash: tokenHash },
      include: { user: true },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Reuse detection: If an already-revoked refresh token is presented, suspect token theft!
    if (session.isRevoked) {
      this.logger.error(
        `🚨 Security alert: Revoked refresh token reuse detected for user ${session.userId}! Revoking all user sessions.`
      );
      await this.revokeAllUserSessions(session.userId);
      throw new UnauthorizedException('Security alert: Token reuse detected. Please log in again.');
    }

    // Check expiration
    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token has expired');
    }

    // Check user active status
    if (!session.user.isActive) {
      throw new UnauthorizedException('Account has been deactivated');
    }

    // Revoke old session
    await this.prisma.session.update({
      where: { id: session.id },
      data: { isRevoked: true },
    });

    // Create rotated session
    const newSession = await this.createSession({
      userId: session.userId,
      ipAddress: ipAddress || session.ipAddress || undefined,
      userAgent: userAgent || session.userAgent || undefined,
      deviceFingerprint: session.deviceFingerprint || undefined,
    });

    return {
      sessionId: newSession.sessionId,
      rawRefreshToken: newSession.rawRefreshToken,
      userId: session.userId,
    };
  }

  /**
   * Revoke a single session
   */
  async revokeSession(sessionId: string, userId: string): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      return false;
    }

    await this.prisma.session.update({
      where: { id: sessionId },
      data: { isRevoked: true },
    });

    return true;
  }

  /**
   * Revoke all active sessions for a user (e.g. on password change or security breach)
   */
  async revokeAllUserSessions(userId: string): Promise<number> {
    const result = await this.prisma.session.updateMany({
      where: {
        userId,
        isRevoked: false,
      },
      data: {
        isRevoked: true,
      },
    });

    return result.count;
  }
}
