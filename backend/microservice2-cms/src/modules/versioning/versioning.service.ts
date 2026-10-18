import { Injectable } from '@nestjs/common';

@Injectable()
export class VersioningService {
  private versionsMap: Map<string, any[]> = new Map();

  async createSnapshot(pageId: string, snapshotData: any, changeSummary?: string) {
    const list = this.versionsMap.get(pageId) || [];
    const newVersion = {
      id: `ver_${Date.now()}`,
      pageId,
      versionNumber: list.length + 1,
      snapshotData,
      changeSummary: changeSummary || 'Sauvegarde automatique',
      createdAt: new Date().toISOString()
    };
    list.unshift(newVersion);
    this.versionsMap.set(pageId, list);
    return newVersion;
  }

  async getVersions(pageId: string) {
    return this.versionsMap.get(pageId) || [];
  }

  async rollback(pageId: string, versionId: string) {
    const list = this.versionsMap.get(pageId) || [];
    const targetVersion = list.find(v => v.id === versionId);
    if (!targetVersion) {
      throw new Error(`Version '${versionId}' introuvable.`);
    }
    return {
      success: true,
      restoredVersion: targetVersion.versionNumber,
      restoredSnapshot: targetVersion.snapshotData,
      message: `Version ${targetVersion.versionNumber} restaurée avec succès.`
    };
  }
}
