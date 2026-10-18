import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async create(dto: any) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description || '',
        date: new Date(dto.date),
        location: dto.location || 'Domaine du Vivant',
      },
    });
  }

  async remove(id: string) {
    await this.prisma.event.delete({ where: { id } });
    return { success: true };
  }
}
