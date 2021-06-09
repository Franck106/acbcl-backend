import { Subscription } from '@model/entities/subscription.entity';
import { ISubscriptionResponse } from '@model/types/subscriptionResponse';

export class SubscriptionResponseDTO implements ISubscriptionResponse {
  id: string;
  createdDate: Date;
  userId: string;
  eventId?: string;
  activityId?: string;
  kidId?: string;

  public static from(dto: Partial<SubscriptionResponseDTO>): SubscriptionResponseDTO {
    return Object.assign(new SubscriptionResponseDTO(), dto);
  }

  public static fromEntity(entity: Subscription) {
    return this.from({
      id: entity.id,
      createdDate: entity.createdDate,
      eventId: entity.event ? entity.event.id : null,
      userId: entity.user.id,
      activityId: entity.activity ? entity.activity.id : null,
      kidId: entity.kid ? entity.kid.id : null,
    });
  }
}
