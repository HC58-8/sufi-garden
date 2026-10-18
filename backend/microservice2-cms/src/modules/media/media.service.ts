import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  private mediaList: any[] = [
    {
      id: 'med_1',
      filename: '1000001613.jpg',
      originalName: '1000001613.jpg',
      mimeType: 'image/jpeg',
      size: 482910,
      url: '/images/1000001613.jpg',
      folderPath: '/retraites',
      altText: 'Hamdi Ben Aïssa en forêt',
      width: 1848,
      height: 933,
      createdAt: new Date().toISOString()
    },
    {
      id: 'med_2',
      filename: 'Inspiration_Banner.png',
      originalName: 'Inspiration_Banner.png',
      mimeType: 'image/png',
      size: 610200,
      url: '/images/Inspiration_Banner.png',
      folderPath: '/programmes',
      altText: 'Bannière Inspirations du Vendredi',
      width: 1048,
      height: 589,
      createdAt: new Date().toISOString()
    }
  ];

  async findAll() {
    return this.mediaList;
  }

  async addMedia(fileData: any) {
    const newMedia = {
      id: `med_${Date.now()}`,
      filename: fileData.filename || 'uploaded-image.png',
      mimeType: fileData.mimeType || 'image/png',
      size: fileData.size || 102400,
      url: fileData.url || '/images/uploaded-image.png',
      folderPath: fileData.folderPath || '/',
      altText: fileData.altText || '',
      createdAt: new Date().toISOString()
    };
    this.mediaList.unshift(newMedia);
    return newMedia;
  }

  async cropMedia(id: string, cropData: { x: number; y: number; width: number; height: number }) {
    const media = this.mediaList.find(m => m.id === id);
    if (media) {
      media.cropMetadata = cropData;
    }
    return media;
  }
}
