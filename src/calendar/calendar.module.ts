import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from '@model/entities/activity.entity';
import { Event } from '@model/entities/event.entity';
import { Guest } from '@model/entities/guest.entity';
import { User } from '@model/entities/user.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Activity, Guest])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
