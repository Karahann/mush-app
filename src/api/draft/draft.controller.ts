import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DraftService } from './draft.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';
import { CurrentUser } from '../auth/types/currentUser';
import { User } from 'src/common/decorators/get-me.decorator';
import { Create } from './dto/create';

@Controller()
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async createPost(@Body() data: Create, @User() user: CurrentUser, @UploadedFile() file: Express.Multer.File) {
    return await this.draftService.create(data, user, file);
  }
}
