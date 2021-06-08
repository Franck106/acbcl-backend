import { getConnection, MoreThan, Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventCreateDTO } from '@model/dto/eventCreate.dto';
import { EventResponseDTO } from '@model/dto/eventResponse.dto';
import { GuestResponseDTO } from '@model/dto/guestResponse.dto';
import { Event } from '@model/entities/event.entity';
import { Guest } from '@model/entities/guest.entity';
import { User } from '@model/entities/user.entity';
import { CalendarExceptions } from '@model/enum/CalendarExceptions.enum';
import { Activity } from '@model/entities/activity.entity';
import { SubscriptionCreateDTO } from '@model/dto/subscriptionCreate.dto';
import { Subscription } from '@model/entities/subscription.entity';
import { SubscriptionResponseDTO } from '@model/dto/subscriptionResponse.dto';
import { GuestCreateDTO } from '@model/dto/guestCreate.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  public async getComingEvents(): Promise<EventResponseDTO[]> {
    const events = await this.eventRepository.find({
      end: MoreThan(new Date()),
    });
    return events.map(event => EventResponseDTO.fromEntity(event));
  }

  public async getAllSubscriptions(): Promise<SubscriptionResponseDTO[]> {
    const subscriptions = await this.subscriptionRepository.find();
    return subscriptions.map(sub => SubscriptionResponseDTO.fromEntity(sub));
  }

  public async createEvent(
    eventDTO: EventCreateDTO,
  ): Promise<EventResponseDTO> {
    if (!eventDTO.title && !eventDTO.activityId) {
      throw new NotAcceptableException(CalendarExceptions.EVENT_NAME_MANDATORY);
    }
    const event = Object.assign(new Event(), eventDTO);
    if (eventDTO.activityId) {
      const activity = await this.activityRepository.findOne(
        eventDTO.activityId,
      );
      event.activity = activity;
    }
    await this.eventRepository.save(event);
    return EventResponseDTO.fromEntity(event);
  }

  public async removeEvent(eventId: string) {
    return this.eventRepository.delete(eventId);
  }

  public async createGuest(dto: GuestCreateDTO): Promise<GuestResponseDTO> {
    const guest = Object.assign(new Guest(), dto);
    const event = await this.eventRepository.findOne(dto.eventId);
    guest.event = event;
    return GuestResponseDTO.fromEntity(await this.guestRepository.save(guest));
  }

  public async createSubscription(
    dto: SubscriptionCreateDTO,
  ): Promise<SubscriptionResponseDTO> {
    const user = await this.userRepository.findOne(dto.userId);
    const subscription = await this.toEntitySubscription(dto);
    subscription.user = user;
    await this.subscriptionRepository.save(subscription);
    const responseDTO = SubscriptionResponseDTO.fromEntity(subscription);
    return responseDTO;
  }

  public async removeSubscription(id: string) {
    return this.subscriptionRepository.delete(id);
  }

  private async toEntitySubscription(
    dto: SubscriptionCreateDTO,
  ): Promise<Subscription> {
    const subscription = new Subscription();
    if (dto.activityId) {
      subscription.activity = await this.activityRepository.findOne(
        dto.activityId,
      );
    } else {
      subscription.event = await this.eventRepository.findOne(dto.eventId);
    }
    return subscription;
  }

  public async linkSubscriptionUserToEvents(
    subscriptionId: string,
  ): Promise<EventResponseDTO[]> {
    const subscription = await this.subscriptionRepository.findOne(
      subscriptionId,
    );
    if (subscription.activity) {
      const events = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.activity', 'activity')
        .leftJoinAndSelect('event.users', 'user')
        .where('activity.id = :id', { id: subscription.activity.id })
        .andWhere('start > :today', { today: new Date() })
        .getMany();
        try {
          
          await Promise.all(
            events.map(evt => {
              getConnection().createQueryBuilder()
                .relation(Event, "users")
                .of(evt)
                .add(subscription.user);
              return evt;
            }),
          );
          await this.subscriptionRepository.delete(subscriptionId);
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException('something wrong');
        }
      return events.map(evt => EventResponseDTO.fromEntity(evt));
    }
  }
}
