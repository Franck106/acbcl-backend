import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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

  @Post()
  public async addActivity(
    @Body() activityCreate: ActivityCreateDTO,
  ): Promise<ActivityResponseDTO> {
    return this.activityService.saveOne(activityCreate);
  }

  @Delete(':id')
  public async deleteActivity(@Param('id') id: string) {
    return this.activityService.removeActivity(id);
  }
}
