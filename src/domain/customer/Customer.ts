import { User } from "../user/User";
import { ICustomer } from "./Customer.interface";
import { Address } from "../address/Address";

export class Customer extends User implements ICustomer{
    phone: string;
    addresses: Address[];
    gender: string;
    dateOfBirth: Date;
    dateJoined: Date;
    defaultBillingAddress: Address;
    defaultShippingAddress: Address;
    nonPromoRewardPoints: number;
    promoRewardPoint: number;

    constructor(firstName: string, lastName: string, email: string, isStaff: boolean, isAdmin: boolean, password?: string, id?: number) {
        super(firstName, lastName, email, false, false, password, id);
    }

}