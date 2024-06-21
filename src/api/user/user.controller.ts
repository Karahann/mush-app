import { Body, Controller, Get, Param, Post, Put, Query, Response, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/get-me.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RelationDecorator } from 'nestjs-paginate-relations-filter-middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';

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

  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  @Put('profile-image')
  updateProfileImage(@UploadedFile() file: Express.Multer.File, @User() user: any) {
    return this.userService.updateProfileImage(file, user.id);
  }
}
