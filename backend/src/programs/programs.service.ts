import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneBySlug(slug: string) {
    const program = await this.prisma.program.findUnique({
      where: { slug },
    });
    if (!program) {
      throw new NotFoundException(`Programme '${slug}' introuvable.`);
    }
    return program;
  }

  async findOneById(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });
    if (!program) {
      throw new NotFoundException(`Programme #${id} introuvable.`);
    }
    return program;
  }

  async create(dto: any) {
    const slug = dto.slug || dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return this.prisma.program.create({
      data: {
        slug,
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description || '',
        datesListText: dto.datesListText || dto.dateText,
        montrealTime: dto.montrealTime,
        parisTime: dto.parisTime,
        location: dto.location,
        replayNotice: dto.replayNotice,
        priceLabel: dto.priceLabel,
        freeOptionText: dto.freeOptionText,
        freeOptionLink: dto.freeOptionLink,
        englishNotice: dto.englishNotice,
        englishLink: dto.englishLink,
        mainButtonLabel: dto.mainButtonLabel || 'Je veux participer',
        zeffyUrl: dto.zeffyUrl,
        type: dto.type || 'Présentiel',
        bannerImage: dto.bannerImage || dto.image,
        secondaryImage: dto.secondaryImage,
        visible: dto.visible !== undefined ? dto.visible : true,
      },
    });
  }

  async update(id: string, dto: any) {
    await this.findOneById(id);
    return this.prisma.program.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    await this.findOneById(id);
    await this.prisma.program.delete({
      where: { id },
    });
    return { success: true, message: `Programme supprimé avec succès.` };
  }
}
