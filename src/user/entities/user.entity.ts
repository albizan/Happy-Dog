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
import { Announce } from '../../announce/entities/announce.entity';

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

  @Column({
    unique: true,
    length: 32,
    nullable: true,
  })
  resetToken: string;

  @CreateDateColumn()
  insertedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Announce, announce => announce.user, {
    nullable: true,
  })
  announces: Announce[];

  @ManyToMany(type => Role, {
    nullable: true,
  })
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];
}
