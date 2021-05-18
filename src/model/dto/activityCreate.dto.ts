import { Activity } from '@model/entities/activity.entity';
import { IActivityCreate } from '@model/types/activityCreate';

export class ActivityCreateDTO implements IActivityCreate {
  name: string;
  price: number;
  place: string;

  public static from(dto: Partial<ActivityCreateDTO>) {
    return Object.assign(new ActivityCreateDTO(), dto);
  }

  public static fromEntity(entity: Activity) {
    return this.from({
      name: entity.name,
      price: entity.price,
      place: entity.place,
    });
  }
}
