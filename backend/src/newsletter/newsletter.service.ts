import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(email: string) {
    if (
      !email ||
      typeof email !== 'string' ||
      !email.includes('@') ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      throw new BadRequestException('Format d\'adresse email invalide.');
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await this.prisma.newsletter.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      if (!existing.active) {
        return this.prisma.newsletter.update({
          where: { id: existing.id },
          data: { active: true },
        });
      }
      return { message: 'Déjà inscrit à notre lettre.', email: cleanEmail };
    }

    return this.prisma.newsletter.create({
      data: {
        email: cleanEmail,
        active: true,
      },
    });
  }

  async findAll() {
    return this.prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async unsubscribe(id: string) {
    const item = await this.prisma.newsletter.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Abonné introuvable.');
    }
    return this.prisma.newsletter.update({
      where: { id },
      data: { active: false },
    });
  }
}
