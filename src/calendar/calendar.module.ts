import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from '@model/entities/activity.entity';
import { Event } from '@model/entities/event.entity';
import { Guest } from '@model/entities/guest.entity';
import { User } from '@model/entities/user.entity';
import { Subscription } from '@model/entities/subscription.entity';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Kid } from '@model/entities/kid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, User, Activity, Guest, Subscription, Kid]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
