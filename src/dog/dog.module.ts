import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { DogService } from './dog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  providers: [DogService],
  exports: [DogService],
})
export class DogModule {}
