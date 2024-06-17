import { TypeOrmModule } from '@nestjs/typeorm';
import { DraftController } from './draft.controller';
import { DraftService } from './draft.service';
import { Module } from '@nestjs/common';
import { DraftModel } from './entities/draft.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([DraftModel]), FileModule],
  controllers: [DraftController],
  exports: [DraftService],
  providers: [DraftService],
})
export class DraftModule {}
