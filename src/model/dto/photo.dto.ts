import { IPhoto } from '@model/types/photo';

export class PhotoDTO implements IPhoto {
  url: string;
  title?: string;
}
