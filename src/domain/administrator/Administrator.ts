import {User} from "../user/User";

export class Administrator extends User{

    constructor(firstName: string, lastName: string, email: string, isStaff: boolean, isAdmin: boolean, password?: string) {
        super(firstName, lastName, email, true, true, password);
    }
}