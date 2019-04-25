import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Dog } from '../../dog/entities/dog.entity';

export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  shelter: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToOne(type => Dog)
  @JoinColumn()
  dog: Dog;
}
