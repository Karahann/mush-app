import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator';

export class Create {
  @IsBoolean()
  isLiked: boolean;

  @IsString()
  postId: string;
}
