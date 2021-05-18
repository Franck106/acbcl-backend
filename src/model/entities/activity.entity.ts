import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "./schedule.entity";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    place: string;

    @OneToMany(() => Schedule, schedule => schedule.activity)
    schedules: Schedule[];
}