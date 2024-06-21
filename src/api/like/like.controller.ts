import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';
import { LikeService } from './like.service';
import { User } from 'src/common/decorators/get-me.decorator';
import { Create } from './dto/create';
import { CurrentUser } from '../auth/types/currentUser';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async createPost(@Body() data: Create, @User() user: CurrentUser) {
    const response = await this.likeService.create(data, user);
    return { success: true, data: response };
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    const response = await this.likeService.findAll(query, relation);
    return { success: true, data: response };
  }

  @Delete(':id')
  async delete(@Param('id') postId: string) {
    const response = await this.likeService.delete(postId);
    return { success: true, data: response };
  }
}
