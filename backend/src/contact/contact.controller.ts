import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async submit(@Body() body: { name: string; email: string; subject: string; message: string }) {
    return this.contactService.submitMessage(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Get()
  async getAll() {
    return this.contactService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Patch(':id/read')
  async markRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }
}
