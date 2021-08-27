import { IAddressRepository } from "@/application/modules/address/ports/IAddressRepository";
import { Address } from "@/domain/address/Address";



export class AddressRepository implements IAddressRepository{
    addAddress(address: Address): Promise<Address> {
        /*return AddressModel.create(address)
            .then((address: Address) => {
                return address;
            }).catch((e) => {
                logger.error("Error when creating staff user : ", e);
                return Promise.reject(e);
            });*/
        return Promise.resolve(undefined);
    }

    deleteAddress(addressId: number): Promise<string> {
        return Promise.resolve("");
    }

    getAddressById(id: number): Promise<Address> {
        return Promise.resolve(undefined);
    }

    updateAddress(address: Address): Promise<Address> {
        return Promise.resolve(undefined);
    }

}