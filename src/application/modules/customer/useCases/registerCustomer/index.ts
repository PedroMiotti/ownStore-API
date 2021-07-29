import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { BaseUseCase, IResultT, ResultT, Result } from "../../../../shared/useCase/BaseUseCase";
import { RegisterCustomerDto } from "../../dto/RegisterCustomerDto";
import { IEmailProvider } from "../../../email/ports/IEmailProvider";
import AppSettings from "../../../../shared/settings/AppSettings";
import encryptionUtils from "../../../../shared/utils/EncryptionUtils";
import dateTimeUtils from '../../../../shared/utils/DateTimeUtils';

export class RegisterCustomerUseCase extends BaseUseCase{
    private readonly customerRepository: ICustomerRepository;
    private readonly emailProvider: IEmailProvider;

    public constructor(customerRepository: ICustomerRepository, emailProvider: IEmailProvider) {
        super();
        this.customerRepository = customerRepository;
        this.emailProvider = emailProvider;
    }

    async execute(customer: RegisterCustomerDto): Promise<IResultT<RegisterCustomerDto>> {
        const result = new ResultT<RegisterCustomerDto>();

        if (!this.isValidRequest(result,  customer)) {
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

    private isValidRequest(result: Result, customer: RegisterCustomerDto): boolean {
        const validations = {};
        validations["email"] = customer.email;
        validations["firstName"] = customer.firstName;
        validations["lastName"] = customer.lastName
        validations["password"] = customer.password as string;

        return this.validator.isValidEntry(result, validations);
    }


}