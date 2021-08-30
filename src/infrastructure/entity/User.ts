import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToMany,
    OneToOne,
    JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";
import { Address } from "../entity/Address";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        default: false
    })
    emailVerified: boolean;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    lastLogin: string;

    @Column({
        default: true
    })
    isActive: boolean

    @Column()
    isAdmin: boolean;

    @Column()
    isStaff: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({
        nullable: true
    })
    gender: number;

    @OneToOne(() => Address, { nullable: true })
    @JoinColumn()
    defaultBillingAddress: Address;

    @OneToOne(() => Address, { nullable: true })
    @JoinColumn()
    defaultShippingAddress: Address;

    @Column({
        nullable: true
    })
    nonPromoRewardPoints: number;

    @Column({
        nullable: true
    })
    promoRewardPoints: number;

    @Column({
        nullable: true
    })
    dateOfBirth: string;

    @OneToMany(() => Address, (address) => address.customer)
    addresses: Address[];

}