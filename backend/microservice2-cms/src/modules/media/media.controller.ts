import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getAllMedia() {
    return this.mediaService.findAll();
  }

  @Post('upload')
  async uploadMedia(@Body() body: any) {
    return this.mediaService.addMedia(body);
  }

  @Post(':id/crop')
  async cropMedia(@Param('id') id: string, @Body() cropData: any) {
    return this.mediaService.cropMedia(id, cropData);
  }
}
