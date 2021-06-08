import { Entity, OneToMany } from "typeorm";
import { Person } from "./person.entity";
import { Subscription } from "./subscription.entity";

@Entity()
export class Kid extends Person {
    @OneToMany(() => Subscription, subscription => subscription.kid)
    subscriptions: Subscription[];
}