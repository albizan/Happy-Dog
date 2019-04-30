import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Announce } from './entities/announce.entity';
import { CreateAnnounceDto } from './dtos/createAnnounce.dto';
import { User } from '../user/entities/user.entity';
import { Dog } from '../dog/entities/dog.entity';
import { AnnounceResponseDto } from './dtos/announceResponse.dto';
import { UserService } from '../user/user.service';
import { DogService } from '../dog/dog.service';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
    private readonly dogService: DogService,
    private readonly userService: UserService,
  ) {}

  // Create a announce Instance and return it
  async create(createAnnounceDto: CreateAnnounceDto, userId: string) {
    // Get User
    const user: User = await this.userService.findById(userId);

    // Destructuring dog properties from createannounceDto
    const { name, breed, age } = createAnnounceDto;

    // Destructuring announce properties from createannounceDto
    const { title, description, shelter } = createAnnounceDto;

    // Create and Save a Dog Instance before saving the announce in the database
    let dog: Dog = await this.dogService.create({
      name,
      breed,
      age,
    });
    dog = await this.dogService.save(dog);

    // Create a announce instance
    const announce: Announce = await this.announceRepository.create({
      title,
      description,
      shelter,
      dog,
      user,
    });

    Logger.log('Announce created', 'AnnounceService');

    // Add newly created announce to user ones
    // this.userService.addAnnounceToUser(user, announce);

    // Return the created announce
    return announce;
  }

  // Save a announce Instance in the database
  async save(announce: Announce): Promise<Announce> {
    return await this.announceRepository.save(announce);
  }

  // Get a announce given its ID
  async findById(id: string): Promise<Announce> {
    return await this.announceRepository.findOne(id);
  }

  // Get all announces
  async findAll(): Promise<AnnounceResponseDto[]> {
    const announces = await this.announceRepository.find();
    return announces.map(announce => {
      return this.toResponseObject(announce);
    });
  }

  // Get announce list of the given user
  async findAllAnnouncesByUser(id: string) {
    const user: User = await this.userService.findById(id);
    return user.announces.map(announce => {
      return this.toResponseObject(announce);
    });
  }

  // Filter announce properties
  toResponseObject(announce: Announce): AnnounceResponseDto {
    return {
      ...announce,
      user: this.userService.toResponseObject(announce.user),
    };
  }
}
