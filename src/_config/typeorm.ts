import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

import { Absence } from '@model/entities/absence.entity';
import { Activity } from '@model/entities/activity.entity';
import { Credentials } from '@model/entities/credentials.entity';
import { Group } from '@model/entities/group.entity';
import { Right } from '@model/entities/right.entity';
import { RightAssignment } from '@model/entities/right-assignment.entity';
import { Role } from '@model/entities/role.entity';
import { Event } from '@model/entities/event.entity';
import { User } from '@model/entities/user.entity';
import { Photo } from '@model/entities/photo.entity';
import { Guest } from '@model/entities/guest.entity';

export const typeOrmConfigFactory = (
  config: ConfigService,
): ConnectionOptions => ({
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: parseInt(config.get('POSTGRES_PORT') || '3000'),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DATABASE'),
  entities: [
    RightAssignment,
    User,
    Event,
    Role,
    Right,
    Group,
    Credentials,
    Activity,
    Absence,
    Photo,
    Guest,
  ],
  synchronize: true,
  ssl: config.get('NODE_ENV') === 'production',
});
