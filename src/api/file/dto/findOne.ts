import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class FindOneFile {
  @Type(() => Number)
  id?: number;

  @Type(() => String)
  modelName?: string;

  @Type(() => String)
  modelId?: string;
}
