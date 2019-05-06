import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
