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

  private logger = new Logger('AnnounceController');

  @Get()
  async findAll(): Promise<AnnounceResponseDto[]> {
    this.logger.log('Retreiving all Posts');
    return await this.announceService.findAll();
  }

  @Get('/my-announces')
  @UseGuards(AuthGuard())
  async findAllAnnouncesbyUser(
    @GetUser() user: User,
  ): Promise<AnnounceResponseDto[]> {
    this.logger.log('Retreving User announces');
    return this.announceService.findAllAnnouncesByUser(user.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @GetUser() user: User,
    @Body() createAnnounceDto: CreateAnnounceDto,
  ): Promise<AnnounceResponseDto> {
    this.logger.log('Creating new announce');

    // Create new announce
    let announce: Announce = await this.announceService.create(
      createAnnounceDto,
      user,
    );

    // Save newly created announce to the database
    announce = await this.announceService.save(announce);

    this.logger.log('Announce created correctly');

    // Remove sensitive info from user
    return this.announceService.toResponseObject(announce);
  }
}
