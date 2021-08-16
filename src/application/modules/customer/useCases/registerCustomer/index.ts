import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { BaseUseCase, IResultT, ResultT, Result } from "../../../../shared/useCase/BaseUseCase";
import { IEmailProvider } from "../../../email/ports/IEmailProvider";
import AppSettings from "../../../../shared/settings/AppSettings";
import encryptionUtils from "../../../../shared/utils/EncryptionUtils";
import dateTimeUtils from '../../../../shared/utils/DateTimeUtils';
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";

export class RegisterCustomerUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;
    private readonly userRepository: IUserRepository;

    public constructor(customerRepository: ICustomerRepository, userRepository: IUserRepository) {
        super();
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
    }

    async execute(customer: CreateUserDto): Promise<IResultT<CreateUserDto>> {
        const result = new ResultT<CreateUserDto>();

        if (!this.isValidRequest(result,  customer)) {
            return result;
        }

        const existingCustomer = await this.userRepository.getUserByEmail(customer.email);
        if(existingCustomer){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.EMAIL_ALREADY_IN_USE, {
                    email: customer.email,
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const salt = encryptionUtils.getSalt(parseInt(AppSettings.EncryptionSaltRounds));
        const passwordHash = encryptionUtils.hashPassword(customer.password, salt);
        customer.password = passwordHash;
        customer.createdAt = dateTimeUtils.getISONow();

        const wasRegistered = await this.customerRepository.registerCustomer(customer);
        if(!wasRegistered){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_CREATING_CUSTOMER),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        // TODO -> Send email verifier to customer
        // this.emailProvider.send();

        result.setData(customer, this.applicationStatusCode.CREATED);
        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_CREATED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;
    }

    private isValidRequest(result: Result, customer: CreateUserDto): boolean {
        const validations = {};
        validations["email"] = customer.email;
        validations["firstName"] = customer.firstName;
        validations["lastName"] = customer.lastName
        validations["password"] = customer.password as string;

        return this.validator.isValidEntry(result, validations);
    }


}