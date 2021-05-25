import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from './event.entity';
import { Photo } from './photo.entity';

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
}
