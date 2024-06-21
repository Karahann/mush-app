import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Create } from './dto/create';
import { Update } from './dto/update';
import { FileService } from '../file/file.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private readonly fileService: FileService,
  ) {}

  async create(data: Create, file?: Express.Multer.File): Promise<UserModel> {
    const user = await this.userRepository.save(data);
    if (file) {
      const imageName = `${randomUUID()}.${file.originalname.split('.').pop()}`;
      const filePath = 'mush-images';
      const createdFile = await this.fileService.create(file, {
        modelName: UserModel.name,
        modelId: user.id,
        fileName: imageName,
        mimeType: file.mimetype,
        size: file.size,
        disk: 'gcp',
        path: filePath,
        isPublic: true,
      });
      await this.update(user.id, { profileImage: createdFile.url });
    }
    return await this.findOne({ where: { id: user.id } });
  }

  async findOne(data: FindOneOptions): Promise<UserModel> {
    return await this.userRepository.findOne(data);
  }

  async findAll(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async update(id: string, data: Update) {
    await this.userRepository.update(id, data);
    return;
  }

  async delete(id: string) {
    return await this.userRepository.delete({ id: id });
  }
}
