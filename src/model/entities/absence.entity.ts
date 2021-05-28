import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { User } from "./user.entity";

@Entity()
export class Absence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reason: string;

    @ManyToOne(() => User, user => user.absences)
    participant: User;

    @ManyToOne(() => Event, schedule => schedule.absences)
    event: Event;
}