import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Role } from './role.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  insertedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];
}
