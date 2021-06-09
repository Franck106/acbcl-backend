import { IGuestCreate } from './guestCreate';

export interface ISubscriptionCreate {
  eventId?: string;
  activityId?: string;
  userId: string;
  kidId?: string;
  guest?: IGuestCreate;
}
