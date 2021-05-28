import { IGuestCreate } from '@model/types/guestCreate';

export class GuestCreateDTO implements IGuestCreate {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;
}
