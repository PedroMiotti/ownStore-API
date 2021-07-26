import {BaseUseCase, IResultT, ResultT, Result} from "../../../../shared/useCase/BaseUseCase";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";
import AppSettings from "@/application/shared/settings/AppSettings";
import { IAdminRepository } from "@/application/modules/administrator/ports/AdminRepository";
import { IDateProvider } from "@/application/shared/ports/IDateProvider";
import { IEncryptionProvider } from "@/application/shared/ports/IEncryptionProvider";

export class CreateUserUseCase extends BaseUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly dateProvider: IDateProvider;
    private readonly encryptionProvider: IEncryptionProvider;

    public constructor(adminRepository: IAdminRepository, dateProvider: IDateProvider, encryptionProvider: IEncryptionProvider) {
        super();
        this.adminRepository = adminRepository;
        this.dateProvider = dateProvider;
        this.encryptionProvider = encryptionProvider;
    }

    async execute(user: CreateUserDto): Promise<IResultT<CreateUserDto>> {
        const result = new ResultT<CreateUserDto>();

        if (!this.isValidRequest(result, user)) {
            return result;
        }

        // TODO -> Check if user id admin

        const doesUserExists = await this.adminRepository.getUserByEmail(user.email);
        if (doesUserExists) {
            result.setError(
                this.resources.getWithParams(this.resourceKeys.EMAIL_ALREADY_IN_USE, {
                    email: user.email,
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const salt = this.encryptionProvider.getSalt(parseInt(AppSettings.EncryptionSaltRounds));
        const defaultPasswd = user.firstName + AppSettings.DefaultUserPasswd;
        const passwdHash = this.encryptionProvider.hashPassword(defaultPasswd, salt)

        user.password = passwdHash;
        user.createdAt = this.dateProvider.getDateNow();

        const wasRegistered = await this.adminRepository.createUser(user);
        if (!wasRegistered) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_CREATING_USER),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        result.setData(user, this.applicationStatusCode.CREATED);

        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_CREATED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;

    }


    private isValidRequest(result: Result, user: CreateUserDto): boolean {
        const validations = {};
        validations["email"] = user.email;
        validations["firstName"] = user.firstName;
        validations["lastName"] = user.lastName;
        validations["isAdmin"] = user.isAdmin;
        validations["isStaff"] = user.isStaff;

        return this.validator.isValidEntry(result, validations);
    }
}