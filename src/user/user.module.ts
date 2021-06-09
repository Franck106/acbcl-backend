import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '@model/entities/user.entity';
import { Credentials } from '@model/entities/credentials.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credentials])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
