import { 
  Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, Get, UseGuards, Request 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { email?: string; password?: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email et mot de passe requis.');
    }
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string }) {
    if (!body.email || !body.password || !body.name) {
      throw new UnauthorizedException('Veuillez renseigner tous les champs obligatoires.');
    }
    // Prevent privilege escalation: only allow standard user registration
    return this.authService.register({
      email: body.email,
      password: body.password,
      name: body.name,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.usersService.findOneById(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    return this.usersService.findOneById(req.user.sub);
  }
}
