import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  // Create User Instance
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepository.create(data);
  }

  // Add a User in the Database
  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
