import { BaseUseCase, Result, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { Customer } from "../../../../../domain/customer/Customer";
import { TokenDto } from "../../../auth/dto/TokenDto";
import { UserLoginDto } from "../../../auth/dto/UserLoginDto";
import {CreateSessionTokenUseCase} from "../../../auth/useCases/createSessionToken";
import {IAuthProvider} from "../../../auth/ports/IAuthProvider";
import { CustomerProfileDto } from "../../dto/CustomerProfileDto";

export class UpdateCustomerProfileUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;
    private readonly authProvider: IAuthProvider;

    public constructor(customerRepository: ICustomerRepository, authProvider: IAuthProvider) {
        super();
        this.customerRepository = customerRepository;
        this.authProvider = authProvider;
    }

    async execute(customer: CustomerProfileDto, id: number): Promise<IResultT<TokenDto>> {
        const result = new ResultT<TokenDto>();

        if(!customer || !id){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_CUSTOMER),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const doesCustomerExists = await this.customerRepository.getCustomerById(id);
        if(!doesCustomerExists){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const customerUpdated = await this.customerRepository.updateCustomer(customer);
        if(!customerUpdated){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_CUSTOMER),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const session = new CreateSessionTokenUseCase(this.authProvider);
        const token: TokenDto = await session.execute(customerUpdated);

        result.setData(token, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_UPDATED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

}