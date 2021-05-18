import { Module } from '@nestjs/common';

import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '@model/entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity])
  ],
  providers: [ActivityService],
  controllers: [ActivityController]
})
export class ActivityModule {}
