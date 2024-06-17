import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateFile {
  @IsString()
  @MaxLength(255)
  modelName: string;

  @IsNumber()
  modelId: string;

  @IsString()
  @MaxLength(255)
  fileName: string;

  @IsString()
  @MaxLength(255)
  mimeType: string;

  @IsNumber()
  size: number;

  @IsString()
  @MaxLength(5)
  disk: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  bucket?: string;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;
}
