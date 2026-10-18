import { Injectable } from '@nestjs/common';

@Injectable()
export class PageBuilderService {
  private layoutStore: Map<string, any[]> = new Map();

  async saveLayout(pageId: string, sections: any[]) {
    this.layoutStore.set(pageId, sections);
    return {
      success: true,
      pageId,
      updatedSectionsCount: sections.length,
      savedAt: new Date().toISOString()
    };
  }

  async getLayout(pageId: string) {
    const layout = this.layoutStore.get(pageId) || [];
    return {
      pageId,
      sections: layout
    };
  }
}
