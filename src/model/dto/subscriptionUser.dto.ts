import { ISubscriptionUser } from '@model/types/subscription-user';
import { ActivityResponseDTO } from './activityResponse.dto';
import { UserResponseDTO } from './userResponse.dto';

export class SubscriptionUserDTO implements ISubscriptionUser {
  activity: ActivityResponseDTO;
  user: UserResponseDTO;
}
