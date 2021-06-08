import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Absence } from './absence.entity';
import { Activity } from './activity.entity';
import { Guest } from './guest.entity';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @Column()
  isAllDay: boolean;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @ManyToMany(
    () => User,
    user => user.events,
    { cascade: true, eager: true },
  )
  @JoinTable()
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

  @OneToOne(
    () => Subscription,
    subscription => subscription.event,
  )
  subscriptions: Subscription[];
}
