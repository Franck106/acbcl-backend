import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { Right } from './right.entity';
import { Role } from './role.entity';

@Entity()
export class RightAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(
    () => Right,
    right => right.rightAssignments,
  )
  right: Right;

  @ManyToOne(
    () => Group,
    group => group.rightAssignments,
  )
  group: Group;

  @ManyToOne(
    () => Role,
    role => role.rightAssignments,
  )
  role: Role;
}
