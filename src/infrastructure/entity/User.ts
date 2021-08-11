import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

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
    createAt: string;
}