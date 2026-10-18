import { Controller, Get } from '@nestjs/common';
import { SiteHealthService } from './site-health.service';

@Controller('site-health')
export class SiteHealthController {
  constructor(private readonly siteHealthService: SiteHealthService) {}

  @Get('score')
  async getHealthScore() {
    return this.siteHealthService.getHealthScore();
  }
}
