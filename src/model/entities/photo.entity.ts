import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from './activity.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({nullable: true})
  title: string;

  @ManyToOne(
    () => Activity,
    activity => activity.photos,
    { onDelete: "CASCADE" }
  )
  activity: Activity;
}
