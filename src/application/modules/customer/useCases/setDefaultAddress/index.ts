import {BaseUseCase, IResultT, ResultT} from "../../../../shared/useCase/BaseUseCase";
import {IAddressRepository} from "../../../address/ports/IAddressRepository";
import {Address} from "../../../../../domain/address/Address";
import {IUserRepository} from "../../../user/ports/IUserRepository";
import {Customer} from "../../../../../domain/customer/Customer";
import {ICustomerRepository} from "@/application/modules/customer/ports/ICustomerRepository";


export class SetDefaultAddressUseCase extends BaseUseCase {
    private readonly addressRepository: IAddressRepository;
    private readonly userRepository: IUserRepository;
    private readonly customerRepository: ICustomerRepository;

    public constructor(addressRepository: IAddressRepository, userRepository: IUserRepository, customerRepository: ICustomerRepository) {
        super();
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    /**
     @param customerId
     @param address
     @param billingOrShipping - If the default address is for billing[0] or shipping[1].
     */
    async execute(customerId: number, address: Address, billingOrShipping: number): Promise<IResultT<Customer>>{
        const result = new ResultT<Customer>();

        if(!customerId){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                    missingParams: "id",
                }),
                this.applicationStatusCode.BAD_REQUEST,
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

        const doesCustomerExists = await this.userRepository.getUserById(customerId);
        if(!doesCustomerExists){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const { firstName, lastName, email, isStaff, isAdmin  } = doesCustomerExists;
        const customer: Customer = new Customer(firstName, lastName, email, isStaff, isAdmin);

        if(billingOrShipping === 0){
            customer.defaultBillingAddress = doesAddressExists;
        }
        else{
            customer.defaultShippingAddress = doesAddressExists;
        }

        const setDefaultAddress = await this.customerRepository.setDefaultAddress(customer, address, billingOrShipping);
        if(!setDefaultAddress){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_ADDRESS),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(customer, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    };
}