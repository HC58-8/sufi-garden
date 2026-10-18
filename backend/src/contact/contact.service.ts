import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async submitMessage(dto: { name: string; email: string; subject: string; message: string }) {
    if (!dto.name || !dto.email || !dto.message) {
      throw new BadRequestException('Nom, email et message sont obligatoires.');
    }

    const created = await this.prisma.contactMessage.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        subject: dto.subject ? dto.subject.trim() : 'Demande d’information',
        message: dto.message.trim(),
      },
    });

    return {
      success: true,
      message: 'Votre message a été transmis avec succès. Nous vous répondrons dans les plus brefs délais.',
      id: created.id,
    };
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { read: true },
    });
  }
}
