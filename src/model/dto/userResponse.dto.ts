import { User } from '@model/entities/user.entity';
import { IUserResponse } from '@model/types/userResponse';

export class UserResponseDTO implements IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  createdDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;

  public static from(dto: Partial<UserResponseDTO>) {
    return Object.assign(new UserResponseDTO(), dto);
  }

  public static fromEntity(entity: User) {
    return this.from({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      birthDate: entity.birthDate,
      createdDate: entity.createDateTime,
      address: entity.address,
      postCode: entity.postCode,
      city: entity.city,
      phone: entity.phone,
    });
  }
}
