import { IUserCreate } from '@model/types/userCreate';

export class UserCreateDTO implements IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;
}
