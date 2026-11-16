import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check API service health' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy and operational',
  })
  check() {
    return {
      success: true,
      statusCode: 200,
      data: this.healthService.getHealth(),
    };
  }
}
