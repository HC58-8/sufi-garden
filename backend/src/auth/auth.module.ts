import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { UsersService } from '../users/users.service';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    if (!secret || secret === 'sufi_garden_jwt_super_secret_key_2026') {
      throw new Error('FATAL SECURITY ERROR: A unique and secure JWT_SECRET is strictly required in production mode!');
    }
    return secret;
  }
  return secret || 'sufi_garden_jwt_super_secret_key_2026';
};

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: getJwtSecret(),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtAuthGuard, RolesGuard],
  exports: [JwtModule, AuthService, UsersService, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}
