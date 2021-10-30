import { Address } from "@/domain/address/Address";
import {createQueryBuilder, getRepository} from "typeorm";
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
        const a = await createQueryBuilder("Address")
            .leftJoinAndSelect("Address.customer", "customer")
            .where("Address.id = :id", { id })
            .getOne();

        if(!a)
            return null;

        return mapper.mapObject(a, new Address());
    }

    async delete(id: number): Promise<string> {

        const addressRepository = getRepository(AddressEntity);

        await addressRepository.delete(id);

        return "Deleted successfully";
    }

}

export default new AddressModel();