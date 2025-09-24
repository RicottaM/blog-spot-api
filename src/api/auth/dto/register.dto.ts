import { IsEmail, isEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @MinLength(4)
  login: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
