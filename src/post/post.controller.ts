import { Controller, Get, Logger } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    Logger.log('Retreiving all Posts', 'PostController');
    return await this.postService.findAll();
  }
}
