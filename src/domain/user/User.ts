import { IUser } from "./User.interface";
import { ISession } from "../Session/ISession";

export class User implements IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    password: string;
    lastLogin: Date;
    isActive: boolean;
    isStaff: boolean;
    isAdmin: boolean;
    createdAt: string;

    constructor(firstName: string, lastName: string, email: string, isStaff: boolean, isAdmin: boolean, password?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isStaff = isStaff;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    createSession(): ISession {
        return {
            id: this.id,
            email: this.email,
            emailVerified: this.emailVerified,
            name: this.firstName + this.lastName,
        } as ISession;
    }
}
