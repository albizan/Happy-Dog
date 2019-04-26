import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DogModule } from 'src/dog/dog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), DogModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
