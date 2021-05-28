import { Guest } from '@model/entities/guest.entity';
import { IGuestResponse } from '@model/types/guestResponse';
import { EventResponseDTO } from './eventResponse.dto';

export class GuestResponseDTO implements IGuestResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  address: string;
  postCode: string;
  city: string;
  phone: string;
  createdDate: Date;
  event: EventResponseDTO;

  public static from(dto: Partial<GuestResponseDTO>) {
    return Object.assign(new GuestResponseDTO(), dto);
  }

  public static fromEntity(entity: Guest) {
    return this.from({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      birthDate: entity.birthDate,
      address: entity.address,
      postCode: entity.postCode,
      city: entity.city,
      phone: entity.phone,
      createdDate: entity.createDateTime,
      event: entity.event,
    });
  }
}
