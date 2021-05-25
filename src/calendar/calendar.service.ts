import { MoreThan, Repository } from 'typeorm';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventCreateDTO } from '@model/dto/eventCreate.dto';
import { EventResponseDTO } from '@model/dto/eventResponse.dto';
import { GuestResponseDTO } from '@model/dto/guestResponse.dto';
import { SubscriptionGuestDTO } from '@model/dto/subscriptionGuest.dto';
import { SubscriptionUserDTO } from '@model/dto/subscriptionUser.dto';
import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { Activity } from '@model/entities/activity.entity';
import { Event } from '@model/entities/event.entity';
import { Guest } from '@model/entities/guest.entity';
import { User } from '@model/entities/user.entity';
import { CalendarExceptions } from '@model/enum/CalendarExceptions.enum';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,
  ) {}

  public async getComingEvents(): Promise<EventResponseDTO[]> {
    const events = await this.eventRepository.find({
      end: MoreThan(new Date()),
    });
    return events.map(event => EventResponseDTO.fromEntity(event));
  }

  public async createEvent(
    eventDTO: EventCreateDTO,
  ): Promise<EventResponseDTO> {
    if (!eventDTO.summary && !eventDTO.activity) {
      throw new NotAcceptableException(CalendarExceptions.EVENT_NAME_MANDATORY);
    }
    const event = await this.eventRepository.save(
      Object.assign(new Event(), eventDTO),
    );
    return EventResponseDTO.fromEntity(event);
  }

  public async registerUserSubsciption(
    subscription: SubscriptionUserDTO,
  ): Promise<UserResponseDTO> {
    if (
      !subscription.activity.events ||
      subscription.activity.events.length === 0
    ) {
      throw new NotAcceptableException(CalendarExceptions.EVENT_MANDATORY);
    }
    const user = Object.assign(new User(), subscription.user);
    try {
      subscription.activity.events.forEach(async eventDTO => {
        const event = Object.assign(new Event(), eventDTO);
        event.users = event.users ? event.users : [];
        event.users.push(user);
        await this.eventRepository.save(event);
      });
    } catch (error) {
      console.error(error);
    }
    return UserResponseDTO.fromEntity(user);
  }

  public async registerGuestSubsciption(
    subscription: SubscriptionGuestDTO,
  ): Promise<GuestResponseDTO> {
    if (
      !subscription.activity.events ||
      subscription.activity.events.length === 0
    ) {
      throw new NotAcceptableException(CalendarExceptions.EVENT_MANDATORY);
    }

    const guest = await this.guestRepository.save(
      Object.assign(new Guest(), subscription.guest),
    );

    try {
      subscription.activity.events.forEach(async eventDTO => {
        const event = Object.assign(new Event(), eventDTO);
        event.guests = event.guests ? event.guests : [];
        event.guests.push(guest);
        await this.eventRepository.save(event);
      });
    } catch (error) {
      console.error(error);
    }
    return GuestResponseDTO.fromEntity(guest);
  }
}
