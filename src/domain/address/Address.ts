import {IAddress} from "./Address.interface";

export class Address implements IAddress{
    id: number;
    streetName: string;
    postCode: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    complement: string;

    constructor(streetName: string, postCode: string, number: string, neighborhood: string, city: string, state: string, country: string, complement: string) {
        this.streetName = streetName;
        this.postCode = postCode;
        this.number = number;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.complement = complement;
    }
}