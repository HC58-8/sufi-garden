import { Controller, Get, Header } from '@nestjs/common';
import { SeoService } from './seo.service';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'text/xml')
  async getSitemap() {
    return this.seoService.getSitemap();
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  async getRobots() {
    return this.seoService.getRobotsTxt();
  }
}
