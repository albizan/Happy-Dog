import {
  Controller,
  Get,
  UseGuards,
  Logger,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { GetUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/userResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  logger = new Logger('UserController');

  @Get('/info')
  @UseGuards(AuthGuard())
  getMyInfo(@GetUser() user: User): UserResponseDto {
    this.logger.log('User info request');
    return this.userService.toResponseObject(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ): Promise<UpdateUserDto> {
    this.logger.log('Update User Request');
    return this.userService.update(user, id, updateUserDto);
  }
}
