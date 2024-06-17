import { Module, forwardRef } from '@nestjs/common';
import { GcpStorageService } from './gcp-storage.service';
import { GcpStorageController } from './gcp-storage.controller';
import { FileModule } from 'src/api/file/file.module';
import { UserModule } from 'src/api/user/user.module';

@Module({
  imports: [],
  controllers: [GcpStorageController],
  providers: [GcpStorageService],
  exports: [GcpStorageService],
})
export class GcpStorageModule {}
