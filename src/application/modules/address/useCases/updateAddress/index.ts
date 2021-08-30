import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { Address } from "../../../../../domain/address/Address";
import { AddressDto } from "@/application/modules/address/dto/AddressDto";
import { Customer } from "../../../../../domain/customer/Customer";
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";
import { User } from "../../../../../domain/user/User";

export class UpdateAddressUseCase extends BaseUseCase {
    private readonly addressRepository: IAddressRepository;
    private readonly userRepository: IUserRepository;


    public constructor(addressRepository: IAddressRepository, userRepository: IUserRepository) {
        super();
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    async execute(address: AddressDto): Promise<IResultT<Address>>{
        const result = new ResultT<Address>();

        const doesCustomerExists: User = await this.userRepository.getUserById(address.customerId);
        if (!doesCustomerExists) {
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const doesAddressExists: Address = await this.addressRepository.getAddressById(address.id);
        if (!doesAddressExists) {
            result.setError(
                this.resources.get(this.resourceKeys.ADDRESS_NOT_FOUND),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const { streetName, postalCode, number, complement, country, state, city, neighborhood } = address;
        const { id, firstName, lastName, email, isStaff, isAdmin } = doesCustomerExists;

        doesAddressExists.customer = new Customer(firstName, lastName, email, isStaff, isAdmin, null, id);
        doesAddressExists.streetName = streetName;
        doesAddressExists.postalCode = postalCode;
        doesAddressExists.number = number;
        doesAddressExists.neighborhood = neighborhood;
        doesAddressExists.city = city;
        doesAddressExists.state = state;
        doesAddressExists.country = country;
        doesAddressExists.complement = complement;

        const wasUpdated: Address = await this.addressRepository.updateAddress(doesAddressExists);
        if (!wasUpdated) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_ADDRESS),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(wasUpdated, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

}