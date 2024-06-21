import { Injectable } from '@nestjs/common';
import { FilterOperator, PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { RelationColumn } from 'nestjs-paginate/lib/helper';
import { LikeModel } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Create } from './dto/create';
import { CurrentUser } from '../auth/types/currentUser';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeModel)
    private likeRepository: Repository<LikeModel>,
  ) {}
  private PAGINATION_CONFIG: PaginateConfig<LikeModel> = {
    sortableColumns: ['createdAt'],
    searchableColumns: [],
    defaultSortBy: [],
    filterableColumns: {
      id: [FilterOperator.EQ, FilterOperator.IN],
    },
    maxLimit: 0,
  };

  async create(data: Create, user: CurrentUser) {
    if (data.isLiked === false) {
      const like = await this.findOne({ where: { postId: data.postId, userId: user.id } });
      return await this.delete(like.id);
    }
    return await this.likeRepository.save({ isLiked: data.isLiked, postId: data.postId, userId: user.id });
  }

  async findAll(query: PaginateQuery, relations: RelationColumn<string>[] = []): Promise<Paginated<LikeModel>> {
    return paginate(query, this.likeRepository, {
      ...this.PAGINATION_CONFIG,
      relations,
    });
  }

  async findOne(options: FindOneOptions) {
    return await this.likeRepository.findOne(options);
  }

  async update(id: string, data: Partial<LikeModel>) {
    return await this.likeRepository.update(id, data);
  }

  async delete(id: string) {
    return await this.likeRepository.delete(id);
  }
}
