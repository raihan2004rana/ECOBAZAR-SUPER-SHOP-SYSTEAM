import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from '@ecobazar/types';
import {
  LoginInput,
  loginSchema,
  RefreshTokenInput,
  refreshTokenSchema,
  ForgotPasswordInput,
  forgotPasswordSchema,
  ResetPasswordInput,
  resetPasswordSchema,
} from '@ecobazar/validators';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email/phone and password' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials or suspended account' })
  async login(
    @Body() body: LoginInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const validated = loginSchema.parse(body);
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await this.authService.login(validated, ip, userAgent);

    // Set secure HTTP-only refresh token cookie
    res.cookie('refresh_token', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth',
    });

    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate refresh token and issue new access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid, expired, or reused refresh token' })
  async refresh(
    @Body() body: Partial<RefreshTokenInput>,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    // Prefer refresh token from HTTP-only cookie, fallback to request body
    const tokenFromCookie = req.cookies ? req.cookies['refresh_token'] : undefined;
    const rawRefreshToken = tokenFromCookie || body.refreshToken;

    const validated = refreshTokenSchema.parse({ refreshToken: rawRefreshToken });
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await this.authService.refreshToken(validated.refreshToken, ip, userAgent);

    // Update HTTP-only cookie with rotated token
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth',
    });

    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout and revoke current active session' })
  async logout(
    @CurrentUser() user: JwtPayload,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await this.authService.logout(user.sessionId, user.sub, ip, userAgent);

    res.clearCookie('refresh_token', { path: '/api/v1/auth' });

    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile and permissions' })
  async getProfile(@CurrentUser() user: JwtPayload) {
    return {
      success: true,
      statusCode: 200,
      data: {
        userId: user.sub,
        email: user.email,
        organizationId: user.orgId,
        branchId: user.branchId,
        roles: user.roles,
        permissions: user.permissions,
        sessionId: user.sessionId,
      },
    };
  }

  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset instructions' })
  async forgotPassword(@Body() body: ForgotPasswordInput) {
    const validated = forgotPasswordSchema.parse(body);
    const result = await this.authService.forgotPassword(validated);

    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with reset token' })
  async resetPassword(@Body() body: ResetPasswordInput) {
    const validated = resetPasswordSchema.parse(body);
    const result = await this.authService.resetPassword(validated);

    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Post('sessions/:id/revoke')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke a specific session' })
  async revokeSession(
    @Param('id') sessionId: string,
    @CurrentUser('sub') userId: string
  ) {
    const result = await this.authService.revokeSession(sessionId, userId);
    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }

  @Post('sessions/revoke-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Revoke all sessions for current user' })
  async revokeAllSessions(@CurrentUser('sub') userId: string) {
    const result = await this.authService.revokeAllSessions(userId);
    return {
      success: true,
      statusCode: 200,
      data: result,
    };
  }
}
