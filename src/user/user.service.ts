import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseDto } from './dtos/userResponse.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create User Instance and return it
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  // Add a User in the Database
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Return the user with the given email
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Return the user with the given id
  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  // Return basic user info without sending private information
  toResponseObject(user: User): UserResponseDto {
    const responseObject = new UserResponseDto();
    const properties: string[] = Object.keys(user);
    properties.forEach(prop => {
      if (prop !== 'password') {
        responseObject[prop] = user[prop];
      }
    });
    return responseObject;
  }
}
