import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseDto } from './dtos/userResponse.dto';
import { Announce } from 'src/announce/entities/announce.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create User Instance and return it
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.userRepository.create({
      ...createUserDto,
      announces: [],
      roles: [],
    });
    return user;
  }

  // Add a User in the Database
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Return the user with the given email
  async findByEmail(email: string): Promise<User> {
    // Get an user instance without relations
    return await this.userRepository.findOne({ where: { email } });
  }

  // Return the user with the given id
  async findById(id: string): Promise<User> {
    // Get user instance with relation of announces
    return await this.userRepository.findOne(id, {
      relations: ['announces'],
    });
  }

  // Return basic user info without sending private information
  toResponseObject(user: User): UserResponseDto {
    const responseObject = new UserResponseDto();
    const properties: string[] = Object.keys(user);
    properties.forEach(prop => {
      if (prop === 'id' || prop === 'name') {
        responseObject[prop] = user[prop];
      }
    });
    return responseObject;
  }

  addAnnounceToUser(user: User, announce: Announce) {
    user.announces.push(announce);
  }
}
