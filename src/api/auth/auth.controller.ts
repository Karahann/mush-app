import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';
import { User } from 'src/common/decorators/get-me.decorator';
import { CurrentUser } from './types/currentUser';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @SkipAuth()
  @Post('register')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async register(@Body() register: Register, @UploadedFile() file?: Express.Multer.File) {
    const data = await this.AuthService.register(register, file);
    return { success: true, data: data };
  }

  @SkipAuth()
  @Post('login')
  async login(@Body() login: Login) {
    const data = await this.AuthService.login(login);
    return { success: true, data: data };
  }

  @Get(['me', 'currentUser'])
  async getMe(@User() user: CurrentUser) {
    const response = await this.AuthService.getMe(user);
    return { success: true, data: response };
  }
}
