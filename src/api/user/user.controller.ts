import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Response,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/common/decorators/get-me.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async update(@Body() data: any, @User() user: any) {
    return await this.userService.update(user.id, data);
  }
}
