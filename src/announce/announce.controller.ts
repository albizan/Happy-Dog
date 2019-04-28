import {
  Controller,
  Get,
  Post,
  Logger,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { Announce } from './entities/announce.entity';
import { AnnounceService } from './announce.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAnnounceDto } from './dtos/createAnnounce.dto';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Get()
  async findAll(): Promise<Announce[]> {
    Logger.log('Retreiving all Posts', 'PostController');
    return await this.announceService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @GetUser() user: User,
    @Body() createAnnounceDto: CreateAnnounceDto,
  ) {
    Logger.log(
      'Received Post request to create new announce',
      'AnnounceController',
    );

    // Create new announce
    const announce: Announce = await this.announceService.create(
      createAnnounceDto,
      user,
    );

    // Save newly created announce to the database
    return await this.announceService.save(announce);

    // Save created announce
    return await this.announceService.save(announce);
  }
}
