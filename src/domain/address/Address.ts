import { IAddress } from "./Address.interface";
import { Customer } from "@/domain/customer/Customer";

export class Address implements IAddress{
    id: number;
    customer: Customer;
    streetName: string;
    postalCode: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    complement: string;

    constructor(customer?: Customer, streetName?: string, postalCode?: string, number?: string, neighborhood?: string, city?: string, state?: string, country?: string, complement?: string, id?: number) {
        this.customer = customer;
        this.streetName = streetName;
        this.postalCode = postalCode;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.complement = complement;
        this.id = id;
    }
}
