import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  age: number;
}
