import { Address } from "@/domain/address/Address";
import { Customer } from "@/domain/customer/Customer";

export interface IAddressRepository{
    addAddress(address: Address): Promise<Address>;
    updateAddress(address: Address): Promise<Address>;
    deleteAddress(customer: Customer, address: Address): Promise<Address>;
    setDefaultAddress(customer: Customer, address: Address): Promise<Address>;
    getAddressById(id: number): Promise<Address>;
}
