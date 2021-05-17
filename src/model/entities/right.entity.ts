import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RightAssignment } from './right-assignment.entity';

@Entity()
export class Right {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @OneToMany(
    () => RightAssignment,
    rightAssignment => rightAssignment.right,
  )
  rightAssignments: RightAssignment[];
}
