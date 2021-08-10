import {IStaff} from "./Staff.interface";
import {User} from "../user/User";

export class Staff extends User implements IStaff {

    constructor(firstName?: string, lastName?: string, email?: string, isStaff?: boolean, isAdmin?: boolean, password?: string) {
        super(firstName, lastName, email, true, true, password);
    }
}