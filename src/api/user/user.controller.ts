import { Body, Controller, Get, Post, Put, Query, Response, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/get-me.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Paginate() query: PaginateQuery, @RelationDecorator() relation: any) {
    return this.userService.findAll(query, relation);
  }

  @Put()
  async update(@Body() data: any, @User() user: any) {
    return await this.userService.update(user.id, data);
  }
}
