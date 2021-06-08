import * as bcrypt from 'bcrypt';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Absence } from './absence.entity';
import { Credentials } from './credentials.entity';
import { Group } from './group.entity';
import { Role } from './role.entity';
import { Event } from './event.entity';
import { Person } from './person.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class User extends Person {
  @OneToOne(() => Credentials, { cascade: true, eager: true })
  @JoinColumn()
  credentials: Credentials;

  @ManyToMany(
    () => Group,
    group => group.users,
  )
  groups: Group[];

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Role[];

  @ManyToMany(
    () => Event,
    event => event.users,
  )
  events: Event[];

  @OneToMany(() => Subscription, subscription => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(
    () => Absence,
    absence => absence.user,
  )
  absences: Absence[];

  public checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.credentials.hashPassword);
  }
}
