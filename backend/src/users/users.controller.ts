import { 
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Post()
  async create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
