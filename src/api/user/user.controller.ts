import { Body, Controller, Get, Post, Put, Query, Response, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/get-me.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    const response = await this.userService.findAll(query, relation);
    return { success: true, data: response };
  }

  @Put()
  async update(@Body() data: any, @User() user: any) {
    const response = await this.userService.update(user.id, data);
    return { success: true, data: response };
  }
}
