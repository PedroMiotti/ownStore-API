import {ICustomerRepository} from "../../contracts/ICustomerRepository";
import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import {RegisterCustomerDto} from "../../dto/RegisterCustomerDto";

export class RegisterCustomerUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;

    public constructor(customerRepository: ICustomerRepository) {
        super();
        this.customerRepository = customerRepository;
    }

    async execute(customer: RegisterCustomerDto): Promise<IResultT<RegisterCustomerDto>> {
        const result = new ResultT<RegisterCustomerDto>();

        if (!this.validator.isValidEntry(result, { customer: RegisterCustomerDto })) {
            return result;
        }

        const existingCustomer = await this.customerRepository.getCustomerByEmail(customer.email);
        if(existingCustomer){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.EMAIL_ALREADY_IN_USE, {
                    email: customer.email,
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        // TODO -> Hash customer password

        await this.customerRepository.registerCustomer(customer);

        result.setData(customer, this.applicationStatusCode.CREATED);

        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_CREATED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;
    }


}