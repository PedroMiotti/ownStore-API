import { IAdminstrator } from './Administrator.interface';
import { Staff } from "@/domain/staff/Staff";

export class Administrator extends Staff implements IAdminstrator{

    constructor( firstName?: string, lastName?: string, email?: string, isStaff?: boolean, isAdmin?: boolean, password?: string, id?: number) {
        super(firstName, lastName, email, true, true, password, id);
    }
}