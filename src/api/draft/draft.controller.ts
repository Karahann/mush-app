import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DraftService } from './draft.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';
import { CurrentUser } from '../auth/types/currentUser';
import { User } from 'src/common/decorators/get-me.decorator';
import { Create } from './dto/create';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';

@Controller('draft')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async createPost(@Body() data: Create, @User() user: CurrentUser, @UploadedFile() file: Express.Multer.File) {
    const response = await this.draftService.create(data, user, file);
    return { success: true, data: response };
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    const response = await this.draftService.findAll(query, relation);
    return { success: true, data: response };
  }
}
