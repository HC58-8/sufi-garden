import { Module } from '@nestjs/common';
import { SiteHealthController } from './site-health.controller';
import { SiteHealthService } from './site-health.service';

@Module({
  controllers: [SiteHealthController],
  providers: [SiteHealthService],
  exports: [SiteHealthService],
})
export class SiteHealthModule {}
