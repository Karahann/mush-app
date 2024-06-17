import { IsOptional, IsString } from "class-validator";

export class Update {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}
