import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../entity/User";

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    streetName: string;

    @Column()
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    postalCode: string;

    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn()
    user: User;
}