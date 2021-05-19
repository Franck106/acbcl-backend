import { Activity } from '@model/entities/activity.entity';
import { IActivityCreate } from '@model/types/activityCreate';

export class ActivityCreateDTO implements IActivityCreate {
  name: string;
  price: number;
  place: string;

}
