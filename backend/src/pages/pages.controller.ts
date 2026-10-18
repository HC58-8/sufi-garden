import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  async getAllPages() {
    return this.pagesService.getAllPages();
  }

  @Get(':pageKey')
  async getPageByKey(@Param('pageKey') pageKey: string) {
    return this.pagesService.getPageByKey(pageKey);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Put(':pageKey')
  async savePage(
    @Param('pageKey') pageKey: string,
    @Body() body: { content: any } | any,
  ) {
    const payload = body.content !== undefined ? body.content : body;
    return this.pagesService.savePage(pageKey, payload);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':pageKey')
  async deletePage(@Param('pageKey') pageKey: string) {
    return this.pagesService.deletePage(pageKey);
  }
}
