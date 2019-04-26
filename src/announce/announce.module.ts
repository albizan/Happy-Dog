import { Module } from '@nestjs/common';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announce } from './entities/announce.entity';
import { DogModule } from 'src/dog/dog.module';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announce]),
    DogModule,
    AuthModule,
    PassportModule,
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
})
export class AnnounceModule {}
