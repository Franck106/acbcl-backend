import { IEvent } from './event';

export interface IGuestResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;
  event: IEvent;
}
