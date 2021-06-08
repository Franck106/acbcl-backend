import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ActivityService } from './activity.service';
import { ActivityResponseDTO } from '@model/dto/activityResponse.dto';
import { ActivityCreateDTO } from '@model/dto/activityCreate.dto';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  public async getAllActivities(): Promise<ActivityResponseDTO[]> {
    return this.activityService.getAll();
  }

  @Get(':id')
  public async getActivityById(
    @Param('id') id: string,
  ): Promise<ActivityResponseDTO> {
    return this.activityService.getById(id);
  }

  @Post()
  public async addActivity(
    @Body() dto: ActivityCreateDTO,
  ): Promise<ActivityResponseDTO> {
    return this.activityService.create(dto);
  }

  @Put()
  public async modifyActivity(
    @Body() dto: ActivityResponseDTO,
  ): Promise<ActivityResponseDTO> {
    return this.activityService.update(dto);
  }

  @Delete(':id')
  public async deleteActivity(@Param('id') id: string) {
    return this.activityService.removeActivity(id);
  }
}
