import { IsString } from "class-validator";

export class Create {
  @IsString()
  name: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
