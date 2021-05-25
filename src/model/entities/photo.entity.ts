import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Photo {
  @PrimaryColumn()
  url: string;

  @Column({nullable: true})
  title: string;

  @ManyToOne(
    () => Activity,
    activity => activity.photos,
  )
  activity: Activity;
}
