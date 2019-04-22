import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CredentialsDto } from './dtos/credentials.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<string> {
    const { name, email, password } = registerUserDto;
    let user: User = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password
    const hashedPassword: string = await this.hashPassword(password);

    // Create new User
    user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save the created user
    await this.userService.save(user);

    // Create jwt payload
    const jwtPayload: JwtPayload = {
      email: user.email,
    };

    // Sign the payload and return encypted jwt
    return this.jwtService.sign(jwtPayload);
  }

  async login(credentials: CredentialsDto): Promise<string> {
    // Validate received credentials
    if (await this.validateCredentials(credentials)) {
      // create jwt payload
      const jwtPayload: JwtPayload = { email: credentials.email };

      // Sign the payload and return encypted jwt
      return this.jwtService.sign(jwtPayload);
    }

    // if credentials are not valid, throw an exception
    throw new UnauthorizedException('Invalid email or password');
  }

  async validateCredentials(credentials: CredentialsDto) {
    // Destruct credentials
    const { email, password } = credentials;

    // Retreive user with given email
    const user: User = await this.userService.findByEmail(email);

    // Check if given credentials are valid, if yes then return true
    if (user) {
      // Check if password is correct
      const isPasswordCorrect: boolean = await this.comparePassword(
        password,
        user.password,
      );
      if (isPasswordCorrect) {
        return true;
      }
    }

    // If they're not, return false
    return false;
  }

  // Hash passed password
  async hashPassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    attempt: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(attempt, hashedPassword);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const { email } = payload;
    return await this.userService.findByEmail(email);
  }
}
