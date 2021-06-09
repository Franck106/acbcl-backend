import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Activity } from './activity.entity';
import { Event } from './event.entity';
import { Kid } from './kid.entity';
import { User } from './user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @ManyToOne(
    () => Kid,
    kid => kid.subscriptions,
    { eager: true },
  )
  kid: Kid;

  @ManyToOne(
    () => User,
    user => user.subscriptions,
    { eager: true },
  )
  user: User;

  @ManyToOne(
    () => Activity,
    activity => activity.subscriptions,
    { eager: true },
  )
  activity: Activity;

  @ManyToOne(
    () => Event,
    event => event.subscriptions,
    { eager: true },
  )
  event: Event;
}
