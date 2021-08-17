import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, BeforeInsert } from "typeorm";
import { DateTime } from "luxon";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    emailVerified: boolean;

    @Column()
    password: string;

    @Column()
    lastLogin: string;

    @Column()
    isActive: boolean

    @Column()
    isAdmin: boolean;

    @Column()
    isStaff: boolean;

    @Column()
    createdAt: string;

    @Column()
    gender: number;

    @Column()
    defaultBillingAddress: number;

    @Column()
    defaultShippingAddress: number;

    @Column()
    nonPromoRewardPoints: number;

    @Column()
    promoRewardPoints: number;

    @Column()
    dateOfBirth: string;



    @BeforeInsert()
    async createdAtGen(){
        this.createdAt = DateTime.local().toISO();
    }
}