import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from '@config/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { ErrorFilter } from './error.filter';
import { validationSchema } from '@config/schema';
import { Absence } from '@model/entities/absence.entity';
import { Credentials } from '@model/entities/credentials.entity';
import { Group } from '@model/entities/group.entity';
import { Right } from '@model/entities/right.entity';
import { RightAssignment } from '@model/entities/right-assignment.entity';
import { Role } from '@model/entities/role.entity';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CalendarModule } from './calendar/calendar.module';
import { Photo } from '@model/entities/photo.entity';

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
      Photo,
    ]),
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        new winston.transports.Console({
          silent: false,
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
    ActivityModule,
    AuthModule,
    UserModule,
    CalendarModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {}
