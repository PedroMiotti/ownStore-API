import { BaseUseCase, IResultT, ResultT, Result, IResult } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "../../ports/ICustomerRepository";

export class DeleteCustomerUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository

    public constructor(customerRepository: ICustomerRepository) {
        super();
        this.customerRepository = customerRepository;
    }

    async execute(id: number): Promise<IResult>{
        const result = new Result();

        if(!id){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.SOME_PARAMETERS_ARE_MISSING, { 
                    id: id.toString(),
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const deletedCustomer = await this.customerRepository.deleteCustomer(id);
        if(!deletedCustomer){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_DELETING_CUSTOMER),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_DELETED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;

    }
}