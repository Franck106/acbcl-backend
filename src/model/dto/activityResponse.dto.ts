import { Activity } from '@model/entities/activity.entity';
import { IActivityResponse } from '@model/types/activityResponse';

export class ActivityResponseDTO implements IActivityResponse {
  id: string;
  name: string;
  price: number;
  place: string;

  public static from(dto: Partial<ActivityResponseDTO>) {
    return Object.assign(new ActivityResponseDTO(), dto);
  }

  public static fromEntity(entity: Activity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      place: entity.place,
    });
  }
}
