import { IActivityCreate } from '@model/types/activityCreate';
import { PhotoDTO } from './photo.dto';

export class ActivityCreateDTO implements IActivityCreate {
  name: string;
  price: number;
  place: string;
  description?: string;
  photos: PhotoDTO[];
}
