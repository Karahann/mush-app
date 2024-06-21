import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';
import { CommentService } from './comment.service';
import { User } from 'src/common/decorators/get-me.decorator';
import { Create } from './dto/create';
import { CurrentUser } from '../auth/types/currentUser';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createPost(@Body() data: Create, @User() user: CurrentUser) {
    const response = await this.commentService.create(data, user);
    return { success: true, data: response };
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    const response = await this.commentService.findAll(query, relation);
    return { success: true, data: response };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.commentService.delete(id);
    return { success: true, data: response };
  }
}
