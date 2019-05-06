import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { ResetPasswordRequestDto } from './dtos/resetPasswordRequest.dto';
import { NewPasswordDto } from './dtos/newPassword.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  logger = new Logger('AuthController');

  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<string> {
    this.logger.log('User tries to log in');
    return await this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    this.logger.log('Registering new User');
    return this.authService.register(registerUserDto);
  }

  @Post('send-reset-token')
  async sendResetToken(@Body() data: ResetPasswordRequestDto): Promise<string> {
    return await this.authService.sendResetToken(data.email);
  }

  // @Todo
  @Post('reset-password')
  async resetPassword(@Body() data: NewPasswordDto) {
    return await this.authService.resetPassword(data);
  }
}
