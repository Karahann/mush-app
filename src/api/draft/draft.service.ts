import { Injectable } from '@nestjs/common';
import { DraftModel } from './entities/draft.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from '../auth/types/currentUser';
import { Create } from './dto/create';
import { randomUUID } from 'crypto';
import { FileService } from '../file/file.service';
import { FilterOperator, PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { RelationColumn } from 'nestjs-paginate/lib/helper';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(DraftModel)
    private draftRepository: Repository<DraftModel>,
    private readonly fileService: FileService,
  ) {}
  private PAGINATION_CONFIG: PaginateConfig<DraftModel> = {
    sortableColumns: ['createdAt'],
    searchableColumns: [],
    defaultSortBy: [],
    filterableColumns: {
      id: [FilterOperator.EQ, FilterOperator.IN],
    },
    maxLimit: 0,
  };

  async create(data: Create, user: CurrentUser, file: Express.Multer.File): Promise<DraftModel> {
    const imageName = `${randomUUID()}.${file.originalname.split('.').pop()}`;
    const filePath = 'mush-images';
    const createdFile = await this.fileService.create(file, {
      modelName: DraftModel.name,
      modelId: user.id,
      fileName: imageName,
      mimeType: file.mimetype,
      size: file.size,
      disk: 'gcp',
      path: filePath,
      isPublic: true,
    });
    return await this.draftRepository.save({
      ...data,
      image: createdFile.url,
      userId: user.id,
    });
  }

  async findAll(query: PaginateQuery, relations: RelationColumn<string>[] = []): Promise<Paginated<DraftModel>> {
    return paginate(query, this.draftRepository, {
      ...this.PAGINATION_CONFIG,
      relations,
    });
  }

  async findOne(data: any) {
    return await this.draftRepository.findOne(data);
  }

  async find() {
    return await this.draftRepository.find();
  }

  async update(id: string, data: any) {
    await this.draftRepository.update(id, data);
    return;
  }

  async delete(id: string) {
    return await this.draftRepository.delete({ id: id });
  }
}
