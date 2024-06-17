import { Injectable } from '@nestjs/common';
import { PostModel } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Create } from './dto/create';
import { Update } from './dto/update';
import { CurrentUser } from '../auth/types/currentUser';
import { randomUUID } from 'crypto';
import { FileService } from '../file/file.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    private readonly fileService: FileService,
  ) {}

  async create(data: Create, user: CurrentUser, file: Express.Multer.File): Promise<PostModel> {
    const imageName = `${randomUUID()}.${file.originalname.split('.').pop()}`;
    const filePath = 'mush-images';
    const createdFile = await this.fileService.create(file, {
      modelName: PostModel.name,
      modelId: user.id,
      fileName: imageName,
      mimeType: file.mimetype,
      size: file.size,
      disk: 'gcp',
      path: filePath,
      isPublic: true,
    });
    return await this.postRepository.save({
      ...data,
      image: createdFile.url,
      userId: user.id,
    });
  }

  async findOne(options: FindOneOptions): Promise<PostModel> {
    return await this.postRepository.findOne(options);
  }

  async findAll(): Promise<PostModel[]> {
    return await this.postRepository.find();
  }

  async update(id: string, data: Update) {
    await this.postRepository.update(id, data);
    return;
  }

  async delete(id: string) {
    return await this.postRepository.delete({ id: id });
  }
}
