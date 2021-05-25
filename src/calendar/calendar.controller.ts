import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { EventCreateDTO } from '@model/dto/eventCreate.dto';
import { EventResponseDTO } from '@model/dto/eventResponse.dto';
import { GuestResponseDTO } from '@model/dto/guestResponse.dto';
import { SubscriptionGuestDTO } from '@model/dto/subscriptionGuest.dto';
import { SubscriptionUserDTO } from '@model/dto/subscriptionUser.dto';
import { UserResponseDTO } from '@model/dto/userResponse.dto';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  public async getAllComingEvents(): Promise<EventResponseDTO[]> {
    return this.calendarService.getComingEvents();
  }

  @Post()
  public async addEvent(
    @Body() eventDTO: EventCreateDTO,
  ): Promise<EventResponseDTO> {
    return this.calendarService.createEvent(eventDTO);
  }

  @Post('/user/subscription')
  @HttpCode(200)
  public async addSubscriptionUser(
    @Body() subscription: SubscriptionUserDTO,
  ): Promise<UserResponseDTO> {
    return this.calendarService.registerUserSubsciption(subscription);
  }

  @Post('guest/subscription')
  public async addSubscriptionGuest(
    @Body() subscription: SubscriptionGuestDTO,
  ): Promise<GuestResponseDTO> {
    return this.calendarService.registerGuestSubsciption(subscription);
  }
}
