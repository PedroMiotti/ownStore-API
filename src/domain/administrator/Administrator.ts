import {User} from "../user/User";

export class Administrator extends User{

    constructor(firstName: string, lastName: string, email: string, password: string, isStaff: boolean) {
        super(firstName, lastName, email, password, true, true);
    }
}