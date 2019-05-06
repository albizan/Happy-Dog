import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResponseDto } from './dtos/userResponse.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

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

  async update(
    user: User,
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<UpdateUserDto> {
    this.ensureCorrectUser(user, id);
    const updatedUser = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    await this.userRepository.save(updatedUser);
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  async updatePassword(user: User, password: string) {
    const updatedUser: User = await this.userRepository.preload({
      id: user.id,
      password,
    });
    return await this.userRepository.save(updatedUser);
  }

  async updateResetToken(user: User, resetToken: string) {
    const updatedUser: User = await this.userRepository.preload({
      id: user.id,
      resetToken,
    });
    return await this.userRepository.save(updatedUser);
  }

  // Return the user with the given email
  async findByEmail(email: string): Promise<User> {
    // Get an user instance without relations
    return await this.userRepository.findOne({ where: { email } });
  }

  // Return the user with the given token
  async findByResetToken(resetToken: string): Promise<User> {
    // Get an user instance without relations
    return await this.userRepository.findOne({ where: { resetToken } });
  }

  // Return the user with the given id
  async findById(id: string): Promise<User> {
    // Get user instance with relation of announces
    return await this.userRepository.findOne(id, {
      relations: ['announces'],
    });
  }

  async existsByEmail(email: string) {
    return (await this.findByEmail(email)) ? true : false;
  }

  async existsByResetToken(resetToken: string) {
    return (await this.findByEmail(resetToken)) ? true : false;
  }

  // Return basic user info without sending private information
  toResponseObject(user: User): UserResponseDto {
    const { id, name } = user;
    return {
      id,
      name,
    };
  }

  // Ensure users can update only their own info
  ensureCorrectUser(user: User, id: string): void {
    if (user.id !== id) {
      throw new UnauthorizedException('Cannot Update, IDs mismatching');
    }
  }
}
