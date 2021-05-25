import { ISubscriptionGuest } from '@model/types/subscription-guest';
import { ActivityResponseDTO } from './activityResponse.dto';
import { GuestCreateDTO } from './guestCreate.dto';

export class SubscriptionGuestDTO implements ISubscriptionGuest {
  guest: GuestCreateDTO;
  activity: ActivityResponseDTO;
}
