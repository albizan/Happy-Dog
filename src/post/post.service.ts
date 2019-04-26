import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto } from './dtos/createPost.dto';
import { User } from '../user/entities/user.entity';
import { Dog } from '../dog/entities/dog.entity';
import { DogService } from '../dog/dog.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly dogService: DogService,
  ) {}

  // Create a Post Instance and return it
  async create(createPostDto: CreatePostDto) {
    // Destructuring dog properties from createPostDto
    const { name, breed, age } = createPostDto;

    // Destructuring post properties from createPostDto
    const { title, description, shelter } = createPostDto;

    // Create and Save a Dog Instance before saving the post in the database
    const dog: Dog = await this.dogService.create({
      name,
      breed,
      age,
    });
    await this.dogService.save(dog);

    // Create a Post instance
    const post: Post = await this.postRepository.create();

    // Populate the instance with the properties from the createPostDto
    post.title = title;
    post.description = description;
    post.shelter = shelter;

    // Complete the Relation inserting dog in the post
    post.dog = dog;
  }

  // Save a Post Instance in the database

  // Get a Post given its ID
  async findById(id: string): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  // Get all posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }
}
