import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    let dbStatus = 'down';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
      dbStatus = 'up';
    } catch {
      dbStatus = 'error';
    }

    return {
      status: dbStatus === 'up' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        api: 'up',
        database: dbStatus,
      },
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }
}
