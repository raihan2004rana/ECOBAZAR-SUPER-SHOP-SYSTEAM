import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly startupTime = Date.now();

  getHealth() {
    return {
      status: 'UP',
      service: 'ECOBAZAR Backend API',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startupTime) / 1000),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
