import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settingsList = await this.prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};
    for (const item of settingsList) {
      settingsMap[item.key] = item.value;
    }
    return settingsMap;
  }

  async updateSettings(dto: Record<string, string>) {
    for (const [key, value] of Object.entries(dto)) {
      if (typeof value === 'string') {
        await this.prisma.setting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }
    return this.getSettings();
  }
}
