import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PagesService, PageDto } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async getAllPages(@Query() query: any) {
    return this.pagesService.findAll(query);
  }

  @Get(':idOrSlug')
  async getPage(@Param('idOrSlug') idOrSlug: string) {
    return this.pagesService.findOne(idOrSlug);
  }

  @Post()
  async createPage(@Body() dto: PageDto) {
    return this.pagesService.create(dto);
  }

  @Post(':id/duplicate')
  async duplicatePage(@Param('id') id: string) {
    return this.pagesService.duplicate(id);
  }

  @Post(':id/archive')
  async archivePage(@Param('id') id: string) {
    return this.pagesService.archive(id);
  }

  @Delete(':id')
  async deletePage(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
