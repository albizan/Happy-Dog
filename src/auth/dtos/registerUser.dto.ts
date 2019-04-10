import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

}
