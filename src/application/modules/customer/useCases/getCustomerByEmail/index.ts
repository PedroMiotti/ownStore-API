import { BaseUseCase, ResultT, Result, IResultT } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { Customer } from '@/domain/customer/Customer'


export class GetCustomerByEmailUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;

    public constructor(customerRepository: ICustomerRepository){
        super();
        this.customerRepository = customerRepository;
    }


    async execute(email: string): Promise<IResultT<Customer>>{
        const result = new ResultT<Customer>();

        if(!this.isValidRequest(result,  email)){
            return result;
        }

        const existingCustomer = await this.customerRepository.getCustomerByEmail(email);
        if(!existingCustomer){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        result.setData(existingCustomer, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_FOUND_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
 
    }


    private isValidRequest(result: Result, email: string): boolean {
        const validations = {};
        validations["email"] = email;

        return this.validator.isValidEntry(result, validations);
    }
}