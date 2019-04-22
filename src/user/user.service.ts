import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create User Instance and return it
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  // Add a User in the Database
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // Return the user with the given email
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Return the user with the given id
  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
