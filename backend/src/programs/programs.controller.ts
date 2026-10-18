import { 
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards 
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Get()
  async getAll() {
    return this.programsService.findAll();
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.programsService.findOneBySlug(slug);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.programsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Post()
  async create(@Body() body: any) {
    return this.programsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.programsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
