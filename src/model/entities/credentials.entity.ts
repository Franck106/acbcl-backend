import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

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


  @BeforeInsert()
  private async createPasswordHash() {
    this.hashPassword = await bcrypt.hash(this.hashPassword, 10);
  }
}
