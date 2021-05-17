import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Credentials {
  @PrimaryColumn()
  login: string;

  @Column()
  @Exclude()
  hashPassword: string;

  constructor(login: string, paswword: string) {
    this.login = login;
    this.hashPassword = paswword;
  }
}
