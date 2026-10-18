import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async getAllPages() {
    const pages = await this.prisma.pageContent.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    return pages.map((p) => {
      try {
        return {
          id: p.id,
          pageKey: p.pageKey,
          content: JSON.parse(p.contentJson),
          updatedAt: p.updatedAt,
        };
      } catch {
        return {
          id: p.id,
          pageKey: p.pageKey,
          content: p.contentJson,
          updatedAt: p.updatedAt,
        };
      }
    });
  }

  async getPageByKey(pageKey: string) {
    const page = await this.prisma.pageContent.findUnique({
      where: { pageKey },
    });
    if (!page) {
      throw new NotFoundException(`Page '${pageKey}' introuvable`);
    }
    try {
      return {
        id: page.id,
        pageKey: page.pageKey,
        content: JSON.parse(page.contentJson),
        updatedAt: page.updatedAt,
      };
    } catch {
      return {
        id: page.id,
        pageKey: page.pageKey,
        content: page.contentJson,
        updatedAt: page.updatedAt,
      };
    }
  }

  async savePage(pageKey: string, contentJson: string | object) {
    const serialized = typeof contentJson === 'string' ? contentJson : JSON.stringify(contentJson);
    const updated = await this.prisma.pageContent.upsert({
      where: { pageKey },
      update: {
        contentJson: serialized,
        updatedAt: new Date(),
      },
      create: {
        pageKey,
        contentJson: serialized,
      },
    });

    return {
      success: true,
      pageKey: updated.pageKey,
      updatedAt: updated.updatedAt,
    };
  }

  async deletePage(pageKey: string) {
    await this.prisma.pageContent.deleteMany({
      where: { pageKey },
    });
    return { success: true, message: `Page '${pageKey}' supprimée` };
  }
}
