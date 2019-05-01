import { Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/userResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  logger = new Logger('UserController');

  @Get('/info')
  @UseGuards(AuthGuard())
  getMyInfo(@GetUser() user: User): UserResponseDto {
    this.logger.log('Retreiving User info');
    return this.userService.toResponseObject(user);
  }
}
