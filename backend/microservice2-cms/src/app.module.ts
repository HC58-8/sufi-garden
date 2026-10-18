import { Module } from '@nestjs/common';
import { PagesModule } from './modules/pages/pages.module';
import { PageBuilderModule } from './modules/page-builder/page-builder.module';
import { MediaModule } from './modules/media/media.module';
import { VersioningModule } from './modules/versioning/versioning.module';
import { SeoModule } from './modules/seo/seo.module';
import { SiteHealthModule } from './modules/site-health/site-health.module';

@Module({
  imports: [
    PagesModule,
    PageBuilderModule,
    MediaModule,
    VersioningModule,
    SeoModule,
    SiteHealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
