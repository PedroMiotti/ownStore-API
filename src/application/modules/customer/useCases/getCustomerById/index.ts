import { BaseUseCase, ResultT, Result, IResultT } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { Customer } from '@/domain/customer/Customer'


export class GetCustomerByIdUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;

    public constructor(customerRepository: ICustomerRepository){
        super();
        this.customerRepository = customerRepository;
    }


    async execute(id: number): Promise<IResultT<Customer>>{
        const result = new ResultT<Customer>();

        if(!this.isValidRequest(result,  id)){
            return result;
        }

        const existingCustomer = await this.customerRepository.getCustomerById(id);
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


    private isValidRequest(result: Result, id: number): boolean {
        const validations = {};
        validations["id"] = id;

        return this.validator.isValidEntry(result, validations);
    }
}