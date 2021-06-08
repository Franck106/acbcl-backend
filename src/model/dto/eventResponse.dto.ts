import { Event } from '@model/entities/event.entity';
import { IEventResponse } from '@model/types/eventResponse';

export class EventResponseDTO implements IEventResponse {
  id: string;
  start: Date;
  end: Date;
  title: string;
  isAllDay: boolean;
  location?: string;
  description?: string;
  activityId?: string;
  subscriptionIds: string[];
  userIds: string[];
  guestIds: string[];
  kidIds: string[];

  public static from(dto: Partial<EventResponseDTO>) {
    return Object.assign(new EventResponseDTO(), dto);
  }

  public static fromEntity(entity: Event) {
    return this.from({
      id: entity.id,
      start: entity.start,
      end: entity.end,
      title: entity.title ? entity.title : '',
      isAllDay: entity.isAllDay,
      activityId: entity.activity ? entity.activity.id : null,
      subscriptionIds: entity.subscriptions
        ? entity.subscriptions.map(sub => sub.id)
        : [],
      userIds: entity.users ? entity.users.map(user => user.id) : [],
      guestIds: entity.guests ? entity.guests.map(guest => guest.id) : [],
    });
  }
}
