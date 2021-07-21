import { Address } from "../address/Address";

export interface ICustomer{
    dateOfBirth: Date;
    addresses: Address[];
    gender: string;
    phone: string;
    promoRewardPoint: number;
    nonPromoRewardPoints: number;
    defaultBillingAddress: Address;
    defaultShippingAddress: Address;
    dateJoined: Date;

}