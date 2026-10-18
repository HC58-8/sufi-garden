import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { ProgramsController } from './programs/programs.controller';
import { ProgramsService } from './programs/programs.service';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { NewsletterController } from './newsletter/newsletter.controller';
import { NewsletterService } from './newsletter/newsletter.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { ContactModule } from './contact/contact.module';
import { HealthModule } from './health/health.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ContactModule,
    HealthModule,
    PagesModule,
  ],
  controllers: [
    UsersController,
    ProgramsController,
    BlogController,
    EventsController,
    NewsletterController,
    SettingsController,
  ],
  providers: [
    ProgramsService,
    BlogService,
    EventsService,
    NewsletterService,
    SettingsService,
  ],
})
export class AppModule {}
