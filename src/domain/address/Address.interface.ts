import { Customer } from "@/domain/customer/Customer";

export interface IAddress {
    id: number;
    customer: Customer;
    streetName: string;
    postalCode: string;
    number: string;
    city: string;
    state: string;
    neighborhood: string;
    country: string;
    complement: string;

}