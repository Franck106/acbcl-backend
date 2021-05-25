import { Entity, ManyToOne } from 'typeorm';
import { Event } from './event.entity';
import { Person } from './person.entity';

@Entity()
export class Guest extends Person {
  @ManyToOne(
    () => Event,
    event => event.guests,
  )
  event: Event;
}
