import { Controller, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResponseDTO } from '@model/dto/activityResponse.dto';
import { IActivityCreate } from '@model/types/activityCreate';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  public async getAllActivities(): Promise<ActivityResponseDTO[]> {
    return this.activityService.getAll();
  }

  //For development only
  @Get('/initDataBase')
  public async initDatabaseForDevelopment(): Promise<any> {
     const activities: IActivityCreate[] = [
        {
            "name": "Anglais",
            "price": 10,
            "place": "Ecole"
        },
        {
            "name": "Java",
            "price": 25,
            "place": "Salle 2"
        },
        {
            "name": "Théâtre",
            "price": 34,
            "place": "Salle 3"
        }
    ]
    return activities.map(async activity => await this.activityService.saveOne(activity));
  }
}
