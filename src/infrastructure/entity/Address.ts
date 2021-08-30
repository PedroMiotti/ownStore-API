import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../entity/User";

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    streetName: string;

    @Column({
        nullable: true
    })
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    neighborhood: string;

    @Column({
        nullable: true
    })
    complement: string;

    @Column({
        nullable: true
    })
    postalCode: string;

    @ManyToOne(() => User, (user) => user.addresses)
    @JoinColumn()
    customer: User;
}