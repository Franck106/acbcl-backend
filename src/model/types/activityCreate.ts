import { IPhoto } from './photo';

export interface IActivityCreate {
  name: string;
  price: number;
  place: string;
  description?: string;
  rangeStart: Date;
  rangeEnd: Date;
  photos: IPhoto[];
}
