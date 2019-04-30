import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Dog } from '../../dog/entities/dog.entity';

@Entity()
export class Announce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shelter: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.announces)
  user: User;

  @OneToOne(type => Dog)
  @JoinColumn()
  dog: Dog;
}
