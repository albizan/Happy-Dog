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

  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    return await this.dogRepository.create(createDogDto);
  }
}
