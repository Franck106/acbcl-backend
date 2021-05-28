import { Event } from '@model/entities/event.entity';
import { IEvent } from '@model/types/event';

export class EventResponseDTO implements IEvent {
  id: string;
  start: Date;
  end: Date;
  summary?: string;
  location?: string;
  description?: string;
  colorId?: number;
  attendees?: { email: string }[];
  activityId?: string;

  public static from(dto: Partial<EventResponseDTO>) {
    return Object.assign(new EventResponseDTO(), dto);
  }

  public static fromEntity(entity: Event) {
    return this.from({
      id: entity.id,
      start: entity.start,
      end: entity.end,
      summary: entity.summary ? entity.summary : entity.activity.name,
      activityId: entity.activity ? entity.activity.id : null,
    });
  }
}
