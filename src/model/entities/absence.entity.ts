import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "./schedule.entity";
import { User } from "./user.entity";

@Entity()
export class Absence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reason: string;

    @ManyToOne(() => User, user => user.absences)
    participant: User;

    @ManyToOne(() => Schedule, schedule => schedule.absences)
    schedule: Schedule;
}