import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { PageBuilderService } from './page-builder.service';

@Controller('page-builder')
export class PageBuilderController {
  constructor(private readonly pageBuilderService: PageBuilderService) {}

  @Get('layout/:pageId')
  async getLayout(@Param('pageId') pageId: string) {
    return this.pageBuilderService.getLayout(pageId);
  }

  @Put('layout')
  async saveLayout(@Body() body: { pageId: string; sections: any[] }) {
    return this.pageBuilderService.saveLayout(body.pageId, body.sections);
  }
}
