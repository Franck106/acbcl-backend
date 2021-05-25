import { IEvent } from './event';
import { IPhoto } from './photo';

export interface IActivityResponse {
  id: string;
  name: string;
  price: number;
  place: string;
  description?: string;
  photos: IPhoto[];
  events?: IEvent[];
}
