import { Controller, Get } from "@nestjs/common";
import { RelationDecorator } from "nestjs-paginate-relations-filter-middleware";
import { Paginate, PaginateQuery } from "nestjs-paginate";

import { SkipAuth } from "src/common/decorators/skip-auth.decorator";
import { FileService } from "./file.service";

@SkipAuth()
@Controller("file")
export class FileController {
  constructor(private fileService: FileService) {}
}
