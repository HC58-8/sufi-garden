import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article.findMany({
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    if (!article) {
      throw new NotFoundException(`Article '${slug}' introuvable.`);
    }
    return article;
  }

  async create(dto: any) {
    const slug = dto.slug || dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Find or create default category
    let category = await this.prisma.category.findFirst();
    if (!category) {
      category = await this.prisma.category.create({
        data: { name: 'Général', slug: 'general' },
      });
    }

    // Find default author
    let author = await this.prisma.user.findFirst();
    if (!author) {
      throw new NotFoundException('Aucun auteur disponible pour créer un article.');
    }

    return this.prisma.article.create({
      data: {
        slug,
        title: dto.title,
        content: dto.content || '',
        image: dto.image,
        published: dto.published !== undefined ? dto.published : true,
        categoryId: dto.categoryId || category.id,
        authorId: dto.authorId || author.id,
        seoTitle: dto.seoTitle || dto.title,
        seoDesc: dto.seoDesc,
      },
      include: { category: true, author: true },
    });
  }

  async update(id: string, dto: any) {
    return this.prisma.article.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.prisma.article.delete({ where: { id } });
    return { success: true };
  }
}
