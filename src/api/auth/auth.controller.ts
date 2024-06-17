import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/helper/upload-image.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @SkipAuth()
  @Post('register')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async register(@Body() register: Register, @UploadedFile() file?: Express.Multer.File) {
    return await this.AuthService.register(register, file);
  }

  @SkipAuth()
  @Post('login')
  async login(@Body() login: Login) {
    return await this.AuthService.login(login);
  }
}
