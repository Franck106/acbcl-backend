import { ISubscriptionCreate } from "@model/types/subscriptionCreate";

export class SubscriptionCreateDTO implements ISubscriptionCreate {
    userId: string;
    eventId?: string;
    activityId?: string;
    kidId?: string;
}