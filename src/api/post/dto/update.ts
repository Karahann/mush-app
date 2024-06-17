import { IsOptional, IsString } from "class-validator";

export class Update {
  @IsString()
  @IsOptional()
  description: string;
}
