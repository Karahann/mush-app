import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Create } from './dto/create';
import { Update } from './dto/update';
import { FileService } from '../file/file.service';
import { randomUUID } from 'crypto';
import { FilterOperator, PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { RelationColumn } from 'nestjs-paginate/lib/helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    private readonly fileService: FileService,
  ) {}
  private PAGINATION_CONFIG: PaginateConfig<UserModel> = {
    sortableColumns: ['createdAt'],
    searchableColumns: [],
    defaultSortBy: [],
    filterableColumns: {
      id: [FilterOperator.EQ, FilterOperator.IN],
    },
    maxLimit: 0,
  };

  async create(data: Create, file?: Express.Multer.File): Promise<UserModel> {
    const isUserNameExist = await this.userRepository.findOne({ where: { userName: data.userName } });
    if (isUserNameExist) {
      throw new Error('User name already exist');
    }

    const isEmailExist = await this.userRepository.findOne({ where: { email: data.email } });
    if (isEmailExist) {
      throw new Error('Email already exist');
    }
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

  async findAll(query: PaginateQuery, relations: RelationColumn<string>[] = []): Promise<Paginated<UserModel>> {
    return paginate(query, this.userRepository, {
      ...this.PAGINATION_CONFIG,
      relations,
    });
  }

  async findOne(data: FindOneOptions): Promise<UserModel> {
    return await this.userRepository.findOne(data);
  }

  async find(options: FindManyOptions): Promise<UserModel[]> {
    return await this.userRepository.find(options);
  }

  async update(id: string, data: Update) {
    await this.userRepository.update(id, data);
    return;
  }

  async delete(id: string) {
    return await this.userRepository.delete({ id: id });
  }
}
