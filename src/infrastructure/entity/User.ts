import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert,
    OneToMany,
    OneToOne,
    JoinColumn
} from "typeorm";
import { DateTime } from "luxon";
import { Address } from "../entity/Address";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
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

    @OneToOne(() => Address)
    @JoinColumn()
    defaultBillingAddress: Address;

    @OneToOne(() => Address)
    @JoinColumn()
    defaultShippingAddress: Address;

    @Column()
    nonPromoRewardPoints: number;

    @Column()
    promoRewardPoints: number;

    @Column()
    dateOfBirth: string;

    @OneToMany(() => Address, (address) => address.user)
    addresses: Address[];

    @BeforeInsert()
    async createdAtGen(){
        this.createdAt = DateTime.local().toISO();
    }
}