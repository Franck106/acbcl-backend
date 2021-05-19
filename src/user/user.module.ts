import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@model/entities/user.entity';
import { Credentials } from '@model/entities/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
