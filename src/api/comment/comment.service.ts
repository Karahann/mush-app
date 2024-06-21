import { Injectable } from '@nestjs/common';
import { FilterOperator, PaginateConfig, PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { RelationColumn } from 'nestjs-paginate/lib/helper';
import { CommentModel } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Create } from './dto/create';
import { CurrentUser } from '../auth/types/currentUser';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentModel)
    private commentRepository: Repository<CommentModel>,
  ) {}
  private PAGINATION_CONFIG: PaginateConfig<CommentModel> = {
    sortableColumns: ['createdAt'],
    searchableColumns: [],
    defaultSortBy: [],
    filterableColumns: {
      id: [FilterOperator.EQ, FilterOperator.IN],
    },
    maxLimit: 0,
  };

  async create(data: Create, user: CurrentUser): Promise<CommentModel> {
    return await this.commentRepository.save({ description: data.description, userId: user.id });
  }

  async findAll(query: PaginateQuery, relations: RelationColumn<string>[] = []): Promise<Paginated<CommentModel>> {
    return paginate(query, this.commentRepository, {
      ...this.PAGINATION_CONFIG,
      relations,
    });
  }

  async delete(id: string) {
    return await this.commentRepository.delete(id);
  }
}
