import { FileModule } from '../file/file.module';
import { PostModel } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel]), FileModule],
  controllers: [PostController],
  exports: [PostService],
  providers: [PostService],
})
export class PostModule {}
