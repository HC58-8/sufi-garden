import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VersioningService } from './versioning.service';

@Controller('versions')
export class VersioningController {
  constructor(private readonly versioningService: VersioningService) {}

  @Get(':pageId')
  async getVersions(@Param('pageId') pageId: string) {
    return this.versioningService.getVersions(pageId);
  }

  @Post('snapshot')
  async createSnapshot(@Body() body: { pageId: string; snapshotData: any; changeSummary?: string }) {
    return this.versioningService.createSnapshot(body.pageId, body.snapshotData, body.changeSummary);
  }

  @Post('rollback')
  async rollback(@Body() body: { pageId: string; versionId: string }) {
    return this.versioningService.rollback(body.pageId, body.versionId);
  }
}
