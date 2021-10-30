import { IAddressRepository } from "@/application/modules/address/ports/IAddressRepository";
import { Address } from "@/domain/address/Address";
import AddressModel from "@/infrastructure/models/address/address.model";
import logger from "@/application/shared/logger";


export class AddressRepository implements IAddressRepository{
    addAddress(address: Address): Promise<Address> {
        return AddressModel.add(address)
            .then((address: Address) => {
                return address;
            }).catch((e) => {
                logger.error("Error when adding address to user : ", e);
                return Promise.reject(e);
            });
    }

    deleteAddress(addressId: number): Promise<string> {
        return AddressModel.delete(addressId)
            .then((res: string) => {
                return res;
            }).catch((e) => {
                logger.error("Error when deleting address : ", e);
                return Promise.reject(e);
            });
    }

    getAddressById(id: number): Promise<Address> {
        return AddressModel.getAddressById(id)
            .then((address: Address) => {
                return address;
            }).catch((e) => {
                logger.error("Error when retrieving address by id : ", e);
                return Promise.reject(e);
            });
    }

    updateAddress(address: Address): Promise<Address> {
        return AddressModel.update(address)
            .then((address: Address) => {
                return address;
            }).catch((e) => {
                logger.error("Error when updating address : ", e);
                return Promise.reject(e);
            });
    }

}