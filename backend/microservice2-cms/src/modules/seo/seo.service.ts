import { Injectable } from '@nestjs/common';

@Injectable()
export class SeoService {
  async getSitemap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sufigarden.org/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sufigarden.org/programming-1</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  }

  async getRobotsTxt() {
    return `User-agent: *
Allow: /
Sitemap: https://sufigarden.org/api/v2/seo/sitemap.xml`;
  }
}
