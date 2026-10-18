import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAll() {
    return this.blogService.findAll();
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Post()
  async create(@Body() body: any) {
    return this.blogService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.blogService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
