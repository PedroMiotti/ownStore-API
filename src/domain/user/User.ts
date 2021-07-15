import { IUser } from "./User.interface";

export class User implements IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    lastLogin: Date;
    isActive: boolean;
    isStaff: boolean;
    isAdmin: boolean;

    constructor(firstName: string, lastName: string, email: string, password: string, isStaff: boolean, isAdmin: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isStaff = isStaff;
        this.isAdmin = isAdmin;

    }
}
