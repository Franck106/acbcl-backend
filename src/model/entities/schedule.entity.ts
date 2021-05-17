import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Absence } from "./absence.entity";
import { Activity } from "./activity.entity";
import { User } from "./user.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(() => User, user => user.schedules)
    participants: User[];

    @OneToMany(() => Absence, absence => absence.schedule)
    absences: Absence[];

    @ManyToOne(() => Activity, activity => activity.schedules)
    activity: Activity;
}