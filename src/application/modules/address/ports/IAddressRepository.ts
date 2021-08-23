import { Address } from "@/domain/address/Address";

export interface IAddressRepository{
    addAddress(address: Address): Promise<Address>;
    updateAddress(address: Address): Promise<Address>;
    deleteAddress(addressId: number): Promise<string>;
    getAddressById(id: number): Promise<Address>;
}
