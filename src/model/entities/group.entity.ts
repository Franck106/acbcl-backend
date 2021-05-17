import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RightAssignment } from './right-assignment.entity';
import { User } from './user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => RightAssignment,
    rightAssignment => rightAssignment.group,
  )
  rightAssignments: RightAssignment[];

  @ManyToMany(
    () => User,
    user => user.groups,
  )
  @JoinTable()
  users: User[];
}
