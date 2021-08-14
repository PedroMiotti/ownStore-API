import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "@/application/modules/customer/ports/ICustomerRepository";
import {Customer} from "@/domain/customer/Customer";


export class ListAllCustomersUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;

    public constructor(customerRepository: ICustomerRepository) {
        super();
        this.customerRepository = customerRepository;
    }

    async execute(): Promise<IResultT<Customer[]>>{
        const result = new ResultT<Customer[]>()

        const users = await this.customerRepository.listAllCustomers();

        result.setData(users, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.USERS_RETRIEVED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }
}