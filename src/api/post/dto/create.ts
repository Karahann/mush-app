import { IsDecimal, IsOptional, IsString } from "class-validator";

export class Create {
  @IsString()
  specie: string;

  @IsDecimal()
  @IsOptional()
  longitude?: number;

  @IsDecimal()
  @IsOptional()
  latitude?: number;

  @IsString()
  description: string;
}
