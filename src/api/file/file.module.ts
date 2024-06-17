import { Module, forwardRef } from "@nestjs/common";
import { FileModel } from "./entities/file.entity";
import { FileService } from "./file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GcpStorageModule } from "src/common/storage/gcp-storage.module";
import { FileController } from "./file.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([FileModel]),
    forwardRef(() => GcpStorageModule),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
