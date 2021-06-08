import { IActivityCreate } from '@model/types/activityCreate';
import { PhotoDTO } from './photo.dto';

export class ActivityCreateDTO implements IActivityCreate {
  name: string;
  price: number;
  place: string;
  rangeStart: Date;
  rangeEnd: Date;
  description?: string;
  photos: PhotoDTO[];
}
