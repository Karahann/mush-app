import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileModel } from "./entities/file.entity";
import { CreateFile } from "./dto/create";
import { GcpStorageService } from "src/common/storage/gcp-storage.service";
import { FindOneFile } from "./dto/findOne";
import fs from "fs";
import { CreateBase64File } from "./dto/create-base64-file";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import {
  FilterOperator,
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from "nestjs-paginate";
import { RelationColumn } from "nestjs-paginate/lib/helper";

@Injectable()
export class FileService {
  private PAGINATION_CONFIG: PaginateConfig<FileModel> = {
    sortableColumns: ["createdAt", "updatedAt"],
    defaultSortBy: [["createdAt", "DESC"]],
    filterableColumns: {
      id: [FilterOperator.EQ, FilterOperator.IN],
      createdAt: [FilterOperator.GTE, FilterOperator.LTE],
    },
  };
  constructor(
    @InjectRepository(FileModel)
    private readonly fileRepository: Repository<FileModel>,
    @Inject(forwardRef(() => GcpStorageService))
    private readonly gcpStorageService: GcpStorageService
  ) {}

  async create(file: Express.Multer.File | any, data: CreateFile) {
    const uploadedFile = await this.gcpStorageService.upload(
      file,
      data.fileName,
      data.path,
      data.isPublic
    );
    const newFile = await this.fileRepository.create({
      ...data,
      bucket: uploadedFile.bucket,
      path: uploadedFile.path,
      url: uploadedFile.url,
    });
    await this.fileRepository.save(newFile);
    return newFile;
  }

  async update(
    fileId: number,
    file: Express.Multer.File | any,
    data: CreateFile
  ) {
    const uploadedFile = await this.gcpStorageService.upload(
      file,
      data.fileName,
      data.path,
      data.isPublic
    );
    const newFile = await this.fileRepository.update(fileId, {
      ...data,
      bucket: uploadedFile.bucket,
      path: uploadedFile.path,
      url: uploadedFile.url,
    });
    return newFile;
  }

  async updateFile(id: number, updateFile: QueryDeepPartialEntity<FileModel>) {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException("Promotion Code Not Found");
    }
    return await this.fileRepository.update({ id }, updateFile);
  }

  async createForBase64(data: CreateBase64File) {
    const uploadedFile = await this.gcpStorageService.saveBase64ToFile(
      data.fileName,
      data.path,
      data.isPublic,
      data.base64
    );
    const newFile = await this.fileRepository.create({
      ...data,
      bucket: uploadedFile.bucket,
      path: uploadedFile.path,
      url: uploadedFile.url,
    });
    await this.fileRepository.save(newFile);
    return newFile;
  }

  async findOneBy(name: FindOneFile): Promise<FileModel> {
    const file = await this.fileRepository.findOneBy(name);
    return file;
  }

  async softDelete(file: FindOneFile) {
    await this.fileRepository.softRemove(file);
  }

  async urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
}
