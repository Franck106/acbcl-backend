import * as bcrypt from 'bcrypt';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Absence } from './absence.entity';
import { Credentials } from './credentials.entity';
import { Group } from './group.entity';
import { Role } from './role.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  birthDate: Date;

  @Column()
  address: string;

  @Column()
  postCode: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

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

  @ManyToMany(() => Schedule, schedule => schedule.participants)
  @JoinTable()
  schedules: Schedule[];

  @OneToMany(() => Absence, absence => absence.participant)
  absences: Absence[];

  public checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.credentials.hashPassword);
  }
}
