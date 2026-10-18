import { 
  Controller, Get, Post, Delete, Body, Param, UseGuards 
} from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('newsletter')
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body('email') email: string) {
    return this.newsletterService.subscribe(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Get()
  async getAll() {
    return this.newsletterService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.newsletterService.unsubscribe(id);
  }
}
