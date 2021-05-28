import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ActivityCreateDTO } from '@model/dto/activityCreate.dto';
import { ActivityResponseDTO } from '@model/dto/activityResponse.dto';
import { Activity } from '@model/entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  public async getAll(): Promise<ActivityResponseDTO[]> {
    const activities = await this.activityRepository.find({
      relations: ['events'],
    });
    return activities.map(activityDTO =>
      ActivityResponseDTO.fromEntity(activityDTO),
    );
  }

  public async saveOne(dto: ActivityCreateDTO): Promise<ActivityResponseDTO> {
    const activity = await this.activityRepository.save(
      Object.assign(new Activity(), dto),
    );
    return ActivityResponseDTO.fromEntity(activity);
  }

  public async removeActivity(id: string) {
    return this.activityRepository.delete(id);
  }
}
