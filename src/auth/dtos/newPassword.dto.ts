import { IsString, IsNotEmpty } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly resetToken: string;
}
