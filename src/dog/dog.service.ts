import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dtos/createDog.dto';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog) private readonly dogRepository: Repository<Dog>,
  ) {}

  // Create Dog Instance and return it
  async create(createDogDto: CreateDogDto): Promise<Dog> {
    return await this.dogRepository.create(createDogDto);
  }

  // Add a Dog to the Database
  async save(dog: Dog): Promise<Dog> {
    return await this.dogRepository.save(dog);
  }

  // Return a dog entity given its id
  async findById(id: string): Promise<Dog> {
    return await this.dogRepository.findOne(id);
  }
}
