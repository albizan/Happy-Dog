import { Controller, Get, Post, Logger, UseGuards } from '@nestjs/common';
import { Announce } from './entities/announce.entity';
import { AnnounceService } from './announce.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Get()
  async findAll(): Promise<Announce[]> {
    Logger.log('Retreiving all Posts', 'PostController');
    return await this.announceService.findAll();
  }
}
