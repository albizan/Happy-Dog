import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Announce } from './entities/announce.entity';
import { CreateAnnounceDto } from './dtos/createAnnounce.dto';
import { User } from '../user/entities/user.entity';
import { Dog } from '../dog/entities/dog.entity';
import { DogService } from '../dog/dog.service';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private readonly announceRepository: Repository<Announce>,
    private readonly dogService: DogService,
  ) {}

  // Create a announce Instance and return it
  async create(createAnnounceDto: CreateAnnounceDto, user: User) {
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
    const announce: Announce = await this.announceRepository.create();

    // Populate the instance with the properties from the createannounceDto
    announce.title = title;
    announce.description = description;
    announce.shelter = shelter;

    // Complete the Relation inserting created dog and received user in the announce
    announce.dog = dog;
    announce.user = user;

    // Return the created announce
    return announce;
  }

  // Save a announce Instance in the database

  // Get a announce given its ID
  async findById(id: string): Promise<Announce> {
    return await this.announceRepository.findOne(id);
  }

  // Get all announces
  async findAll(): Promise<Announce[]> {
    return await this.announceRepository.find();
  }
}
