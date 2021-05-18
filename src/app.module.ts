import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from '@config/typeorm';

import { validationSchema } from '@config/schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Absence } from '@model/entities/absence.entity';
import { Activity } from '@model/entities/activity.entity';
import { Credentials } from '@model/entities/credentials.entity';
import { Group } from '@model/entities/group.entity';
import { Right } from '@model/entities/right.entity';
import { RightAssignment } from '@model/entities/right-assignment.entity';
import { Role } from '@model/entities/role.entity';
import { Schedule } from '@model/entities/schedule.entity';
import { User } from '@model/entities/user.entity';
import { ActivityModule } from './activity/activity.module';

const envFilePath = [`.env.${process.env.NODE_ENV}`];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    TypeOrmModule.forFeature([
      Absence,
      Credentials,
      Group,
      Right,
      RightAssignment,
      Role,
      Schedule,
      User,
    ]),
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
