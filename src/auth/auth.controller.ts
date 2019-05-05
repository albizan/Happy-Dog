import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { ResetPasswordRequestDto } from './dtos/resetPasswordRequest.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  logger = new Logger('AuthController');

  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<string> {
    this.logger.log('User logs in');
    return await this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    this.logger.log('Register new User');
    return this.authService.register(registerUserDto);
  }

  @Post('send-reset-token')
  sendResetToken(@Body() data: ResetPasswordRequestDto) {
    return this.authService.sendResetToken(data.email);
  }

  // @Todo
  @Get('reset-password/:token')
  resetPassword(@Param('token') token: string) {
    return {
      token,
    };
  }
}
