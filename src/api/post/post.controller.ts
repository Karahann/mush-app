import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { Create } from './dto/create';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';
import { User } from 'src/common/decorators/get-me.decorator';
import { CurrentUser } from '../auth/types/currentUser';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';
import { response } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @SkipAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async createPost(@Body() data: Create, @User() user: CurrentUser, @UploadedFile() file: Express.Multer.File) {
    const response = await this.postService.create(data, user, file);
    return { success: true, data: response };
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    const response = await this.postService.findAll(query, relation);
    return { success: true, data: response };
  }
}
