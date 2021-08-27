import {Address} from "@/domain/address/Address";
import {Customer} from "@/domain/customer/Customer";

export class AddAddressDto {
    streetName: string;
    postalCode?: string;
    number?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    country: string;
    complement?: string;
}

