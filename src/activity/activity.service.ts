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
    const activities = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.photos', 'photo')
      .leftJoinAndSelect('activity.events', 'event')
      .leftJoinAndSelect('event.users', 'user')
      .leftJoinAndSelect('event.guests', 'guest')
      .getMany();

    return activities.map(activity => {
      const activityDTO = ActivityResponseDTO.fromEntity(activity);
      return activityDTO;
    });
  }

  public async getById(id: string): Promise<ActivityResponseDTO> {
    const activity = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.photos', 'photo')
      .leftJoinAndSelect('activity.events', 'event')
      .leftJoinAndSelect('event.users', 'user')
      .leftJoinAndSelect('event.guests', 'guest')
      .where('activity.id = :activityId', { activityId: id })
      .getOne();

    return ActivityResponseDTO.fromEntity(activity);
  }

  public async create(dto: ActivityCreateDTO): Promise<ActivityResponseDTO> {
    const activity = await this.activityRepository.save(
      Object.assign(new Activity(), dto),
    );
    return ActivityResponseDTO.fromEntity(activity);
  }

  public async update(dto: ActivityResponseDTO): Promise<ActivityResponseDTO> {
    const activity = await this.activityRepository.save(
      Object.assign(new Activity(), dto),
    );
    return ActivityResponseDTO.fromEntity(activity);
  }

  public async removeActivity(id: string) {
    return this.activityRepository.delete(id);
  }
}
