import { Activity } from '@model/entities/activity.entity';
import { IActivityResponse } from '@model/types/activityResponse';
import { EventResponseDTO } from './eventResponse.dto';
import { PhotoDTO } from './photo.dto';

export class ActivityResponseDTO implements IActivityResponse {
  id: string;
  name: string;
  price: number;
  place: string;
  rangeStart: Date;
  rangeEnd: Date;
  description?: string;
  photos: PhotoDTO[];
  eventIds: string[];
  subscriptionIds: string[];

  public static from(dto: Partial<ActivityResponseDTO>) {
    return Object.assign(new ActivityResponseDTO(), dto);
  }

  public static fromEntity(entity: Activity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      place: entity.place,
      rangeStart: entity.rangeStart,
      rangeEnd: entity.rangeEnd,
      description: entity.description ? entity.description : null,
      photos: entity.photos,
      eventIds: entity.events ? entity.events.map((event) => event.id) : [],
      subscriptionIds: entity.subscriptions ? entity.subscriptions.map(sub => sub.id) : [],
    });
  }
}
