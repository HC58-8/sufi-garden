import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR)
  @Post()
  async create(@Body() body: any) {
    return this.eventsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
