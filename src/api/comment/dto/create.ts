import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class Create {
  @IsString()
  description: string;
}
