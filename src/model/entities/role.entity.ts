import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RightAssignment } from './right-assignment.entity';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => RightAssignment,
    rightAssignment => rightAssignment.role,
  )
  rightAssignments: RightAssignment[];

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: User[];
}
