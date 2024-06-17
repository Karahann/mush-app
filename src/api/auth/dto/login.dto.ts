import { IsEmail, IsString, MaxLength } from "class-validator";

export class Login {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(100)
  password: string;
}
