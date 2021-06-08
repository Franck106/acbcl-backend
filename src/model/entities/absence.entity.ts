import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Guest } from './guest.entity';
import { User } from './user.entity';

@Entity()
export class Absence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reason: string;

  @ManyToOne(
    () => User,
    user => user.absences,
  )
  user: User;

  @OneToOne(
    () => Guest,
    guest => guest.absence,
    { eager: true },
  )
  guest: Guest;

  @ManyToOne(
    () => Event,
    schedule => schedule.absences,
  )
  event: Event;
}
