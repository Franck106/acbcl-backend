import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { Absence } from './absence.entity';
import { Event } from './event.entity';
import { Person } from './person.entity';

@Entity()
export class Guest extends Person {
  @ManyToOne(
    () => Event,
    event => event.guests,
  )
  event: Event;

  @OneToOne(
    () => Absence,
    absence => absence.guest,
  )
  absence: Absence;
}
