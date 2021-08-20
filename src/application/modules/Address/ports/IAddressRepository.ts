import { Address } from "@/domain/address/Address";
import { Customer } from "@/domain/customer/Customer";

export interface IAddressRepository{
    addAddress(address: Address): Promise<Address>;
    updateAddress(customer: Customer, address: Address): Promise<Address>;
    deleteAddress(customer: Customer, address: Address): Promise<Address>;
    makeAddressDefault(customer: Customer, address: Address): Promise<Address>;
}