import { Address } from "@/domain/address/Address";
import { getRepository } from "typeorm";
import { Address as AddressEntity } from '../../entity/Address';
import { AddressDto } from "@/application/modules/address/dto/AddressDto";
import mapper from "mapper-tsk";

class AddressModel {
    async add(address: AddressDto): Promise<Address>{
        const addressRepository = getRepository(AddressEntity);
        const a: AddressDto | undefined = await addressRepository.save(address);

        if(!a)
            return null;

        return mapper.mapObject(a, new Address());
    }

    async update(address: AddressDto): Promise<Address>{
        const addressRepository = getRepository(AddressEntity);
        const a: AddressDto | undefined = await addressRepository.save({ ...address });

        if(!a)
            return null;

        return mapper.mapObject(a, new Address());
    }

    async getAddressById(id: number): Promise<Address> {
        const addressRepository = getRepository(AddressEntity);
        const a: AddressDto | undefined = await addressRepository.findOne({ id });

        if(!a)
            return null;

        return mapper.mapObject(a, new Address());
    }


}

export default new AddressModel();