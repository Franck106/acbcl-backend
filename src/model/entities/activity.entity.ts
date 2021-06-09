import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from './event.entity';
import { Photo } from './photo.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  place: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  rangeStart: Date;

  @Column()
  rangeEnd: Date;

  @OneToMany(
    () => Event,
    event => event.activity,
  )
  events: Event[];

  @OneToMany(
    () => Photo,
    photo => photo.activity,
    { eager: true, cascade: true },
  )
  photos: Photo[];

  @OneToMany(
    () => Subscription,
    subscription => subscription.activity,
  )
  subscriptions: Subscription[];
}
