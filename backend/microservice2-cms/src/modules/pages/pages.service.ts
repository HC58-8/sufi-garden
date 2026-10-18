import { Injectable, NotFoundException } from '@nestjs/common';

export interface PageDto {
  title: string;
  slug?: string;
  fullPath?: string;
  status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  accessLevel?: 'PUBLIC' | 'PRIVATE' | 'PASSWORD_PROTECTED' | 'ROLE_PROTECTED';
  password?: string;
  locale?: string;
  sections?: any[];
}

@Injectable()
export class PagesService {
  private pagesStore: Map<string, any> = new Map();

  constructor() {
    // Seed initial default pages for instant demo
    const defaultPages = [
      {
        id: 'page_home',
        title: "Page d'Accueil",
        slug: 'home',
        fullPath: '/',
        status: 'PUBLISHED',
        accessLevel: 'PUBLIC',
        locale: 'fr',
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 'sec_hero',
            name: 'Hero Section',
            sectionType: 'hero',
            orderIndex: 0,
            components: [
              { id: 'comp_1', componentType: 'heading', contentData: { text: 'Revenir au vivant.' } },
              { id: 'comp_2', componentType: 'paragraph', contentData: { text: "L'Institut du Jardin Soufi tisse un dialogue vivant..." } }
            ]
          }
        ]
      },
      {
        id: 'page_about',
        title: 'À Propos',
        slug: 'about',
        fullPath: '/about',
        status: 'PUBLISHED',
        accessLevel: 'PUBLIC',
        locale: 'fr',
        updatedAt: new Date().toISOString(),
        sections: [
          {
            id: 'sec_founder',
            name: 'Fondateur Section',
            sectionType: 'text-image',
            orderIndex: 0,
            components: [
              { id: 'comp_3', componentType: 'heading', contentData: { text: 'Hamdi Ben Aïssa' } }
            ]
          }
        ]
      }
    ];

    defaultPages.forEach(p => this.pagesStore.set(p.id, p));
  }

  async findAll(query?: any) {
    return Array.from(this.pagesStore.values());
  }

  async findOne(idOrSlug: string) {
    let page = this.pagesStore.get(idOrSlug);
    if (!page) {
      page = Array.from(this.pagesStore.values()).find(p => p.slug === idOrSlug || p.fullPath === idOrSlug);
    }
    if (!page) {
      throw new NotFoundException(`Page '${idOrSlug}' non trouvée.`);
    }
    return page;
  }

  async create(dto: PageDto) {
    const slug = dto.slug || dto.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newPage = {
      id: `page_${Date.now()}`,
      title: dto.title,
      slug,
      fullPath: dto.fullPath || `/${slug}`,
      status: dto.status || 'DRAFT',
      accessLevel: dto.accessLevel || 'PUBLIC',
      password: dto.password || null,
      locale: dto.locale || 'fr',
      sections: dto.sections || [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.pagesStore.set(newPage.id, newPage);
    return newPage;
  }

  async duplicate(id: string) {
    const original = await this.findOne(id);
    const duplicated = {
      ...original,
      id: `page_${Date.now()}`,
      title: `${original.title} (Copie)`,
      slug: `${original.slug}-copie-${Date.now()}`,
      fullPath: `${original.fullPath}-copie`,
      status: 'DRAFT',
      updatedAt: new Date().toISOString()
    };
    this.pagesStore.set(duplicated.id, duplicated);
    return duplicated;
  }

  async archive(id: string) {
    const page = await this.findOne(id);
    page.status = 'ARCHIVED';
    page.updatedAt = new Date().toISOString();
    this.pagesStore.set(id, page);
    return page;
  }

  async remove(id: string) {
    const page = await this.findOne(id);
    this.pagesStore.delete(page.id);
    return { success: true, message: `Page '${id}' supprimée avec succès.` };
  }
}
