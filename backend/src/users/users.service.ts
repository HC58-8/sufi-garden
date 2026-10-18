import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException(`Utilisateur #${id} introuvable.`);
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userDto: { email: string; password?: string; name: string; role?: Role; status?: string }) {
    const existing = await this.findOneByEmail(userDto.email);
    if (existing) {
      throw new ConflictException(`Un compte avec l'adresse ${userDto.email} existe déjà.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password || 'admin123', salt);

    const newUser = await this.prisma.user.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
        name: userDto.name,
        role: userDto.role || Role.USER,
        status: userDto.status || 'Actif',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return newUser;
  }

  async update(id: string, dto: { email?: string; password?: string; name?: string; role?: Role; status?: string }) {
    const data: any = { ...dto };
    if (dto.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(dto.password, salt);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
    return { success: true, message: `Utilisateur supprimé.` };
  }
}
