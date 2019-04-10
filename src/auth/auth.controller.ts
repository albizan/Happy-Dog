import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<string> {
    return await this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
    return this.authService.register(registerUserDto);
  }
}
