import { BaseUseCase, Result, IResult } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { ISession } from "@/domain/session/ISession";

export class DeleteCustomerUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository

    public constructor(customerRepository: ICustomerRepository) {
        super();
        this.customerRepository = customerRepository;
    }

    async execute(id: number, session: ISession): Promise<IResult>{
        const result = new Result();

        if(!id){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.SOME_PARAMETERS_ARE_MISSING, { 
                    missingParams: "id",
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        if(session.id !== id){
            result.setError(
                this.resources.get(this.resourceKeys.DELETE_CUSTOMER_NOT_AUTHORIZED),
                this.applicationStatusCode.UNAUTHORIZED
            );
            return result;
        }

        const deletedCustomer = await this.customerRepository.deleteCustomer(id);
        if(!deletedCustomer){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_DELETING_CUSTOMER),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_DELETED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;

    }

}