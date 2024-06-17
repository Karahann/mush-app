import { Body, Controller, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { GcpStorageService } from './gcp-storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@SkipAuth()
@Controller('gcp')
export class GcpStorageController {
  constructor(private readonly gcpStorageService: GcpStorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {}
}
