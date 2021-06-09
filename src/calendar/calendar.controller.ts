import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { EventCreateDTO } from '@model/dto/eventCreate.dto';
import { EventResponseDTO } from '@model/dto/eventResponse.dto';
import { CalendarService } from './calendar.service';
import { SubscriptionCreateDTO } from '@model/dto/subscriptionCreate.dto';
import { SubscriptionResponseDTO } from '@model/dto/subscriptionResponse.dto';
import { GuestCreateDTO } from '@model/dto/guestCreate.dto';
import { GuestResponseDTO } from '@model/dto/guestResponse.dto';

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

  @Delete(':id')
  public async deleteEvent(@Param('id') id: string) {
    return this.calendarService.removeEvent(id);
  }

  @Post('/subscription')
  public async addSubscription(
    @Body() dto: SubscriptionCreateDTO,
  ): Promise<SubscriptionResponseDTO> {
    return this.calendarService.createSubscription(dto);
  }

  @Get('subscription/:id/validate')
  public async validateSubscription(@Param('id') id: string): Promise<EventResponseDTO[]> {
    return this.calendarService.linkSubscriptionUserToEvents(id);
  }

  @Get('/subscription')
  public async findAllSubscriptions(): Promise<SubscriptionResponseDTO[]> {
    return this.calendarService.getAllSubscriptions();
  }

  @Delete('/subscription/:id')
  public async cancelSubscription(@Param('id') id: string) {
    return this.calendarService.removeSubscription(id);
  }

  @Post('/guest')
  public async addGuest(@Body() dto: GuestCreateDTO): Promise<GuestResponseDTO> {
    return this.calendarService.createGuest(dto);
  }
}
