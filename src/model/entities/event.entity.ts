import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Absence } from './absence.entity';
import { Activity } from './activity.entity';
import { Guest } from './guest.entity';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  location: string;

  @ManyToMany(
    () => User,
    user => user.events,
  )
  users: User[];

  @OneToMany(
    () => Guest,
    guest => guest.event,
  )
  guests: Guest[];

  @OneToMany(
    () => Absence,
    absence => absence.event,
  )
  absences: Absence[];

  @ManyToOne(
    () => Activity,
    activity => activity.events,
    { eager: true },
  )
  activity: Activity;
}
