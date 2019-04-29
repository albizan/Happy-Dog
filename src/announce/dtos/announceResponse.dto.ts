import { UserResponseDto } from '../../user/dtos/userResponse.dto';
import { Dog } from '../../dog/entities/dog.entity';

export class AnnounceResponseDto {
  id: string;
  shelter: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserResponseDto;
  dog: Dog;
}
