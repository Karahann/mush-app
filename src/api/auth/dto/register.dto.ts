import { IsString, MaxLength } from "class-validator";

export class Register {
  @MaxLength(100)
  @IsString()
  name: string;

  @MaxLength(100)
  @IsString()
  userName: string;

  @MaxLength(255)
  @IsString()
  email: string;

  @MaxLength(100)
  @IsString()
  password: string;
}
