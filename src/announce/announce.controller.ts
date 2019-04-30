import { Controller, Get, Post, Logger, UseGuards, Body } from '@nestjs/common';
import { Announce } from './entities/announce.entity';
import { AnnounceService } from './announce.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAnnounceDto } from './dtos/createAnnounce.dto';
import { GetUser } from '../user/decorators/user.decorator';
import { User } from '../user/entities/user.entity';
import { AnnounceResponseDto } from './dtos/announceResponse.dto';

@Controller('announce')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Get()
  async findAll(): Promise<AnnounceResponseDto[]> {
    Logger.log('Retreiving all Posts', 'AnnounceController');
    return await this.announceService.findAll();
  }

  @Get('/my-announces')
  @UseGuards(AuthGuard())
  async findAllAnnouncesbyUser(
    @GetUser() user: User,
  ): Promise<AnnounceResponseDto[]> {
    Logger.log('Retreving announces of given user', 'AnnounceController');
    return this.announceService.findAllAnnouncesByUser(user.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @GetUser() user: User,
    @Body() createAnnounceDto: CreateAnnounceDto,
  ): Promise<AnnounceResponseDto> {
    Logger.log('Creating new announce', 'AnnounceController');

    // Create new announce
    let announce: Announce = await this.announceService.create(
      createAnnounceDto,
      user,
    );

    // Save newly created announce to the database
    announce = await this.announceService.save(announce);

    Logger.log('Announce created correctly', 'AnnounceController');

    // Remove sensitive info from user
    return this.announceService.toResponseObject(announce);
  }
}
