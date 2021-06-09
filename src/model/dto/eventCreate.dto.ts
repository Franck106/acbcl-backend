import { IEventCreate } from '@model/types/eventCreate';

export class EventCreateDTO implements IEventCreate {
  start: Date;
  end: Date;
  title: string;
  isAllDay: boolean;
  location?: string;
  description?: string;
  activityId?: string;
}
