import { BaseUseCase, IResultT, Result, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { Address } from "../../../../../domain/address/Address";
import { IUserRepository } from "../../../../modules/user/ports/IUserRepository";
import { Customer } from "../../../../../domain/customer/Customer";
import { User } from "../../../../../domain/user/User";

export class AddAddressUseCase extends BaseUseCase {
    private readonly addressRepository: IAddressRepository;
    private readonly userRepository: IUserRepository;

    public constructor(addressRepository: IAddressRepository, userRepository: IUserRepository) {
        super();
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    async execute(customerId: number, address: Address): Promise<IResultT<Address>>{
        const result = new ResultT<Address>();

        if (!this.isValidRequest(result, address, customerId)) {
            return result;
        }

        const doesCustomerExists: User = await this.userRepository.getUserById(customerId);
        if (!doesCustomerExists) {
                result.setError(
                    this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                    this.applicationStatusCode.BAD_REQUEST
                );
            return result;
        }

        const { firstName, lastName, email, isStaff, isAdmin } = doesCustomerExists
        address.customer = new Customer(firstName, lastName, email, isStaff, isAdmin);

        const wasRegistered: Address = await this.addressRepository.addAddress(address);
        if (!wasRegistered) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_ADDING_ADDRESS),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(wasRegistered, this.applicationStatusCode.CREATED);

        result.setMessage(
            this.resources.get(this.resourceKeys.ADDRESS_ADDED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;
    }

    private isValidRequest(result: Result, address: Address, customerId: number): boolean {
        const validations = {};
        validations["customerID"] = customerId;
        validations["streetName"] = address.streetName;
        validations["postalCode"] = address.postalCode;
        validations["city"] = address.city;
        validations["state"] = address.state;
        validations["country"] = address.country;
        validations["neighborhood"] = address.neighborhood;

        return this.validator.isValidEntry(result, validations);
    }
}