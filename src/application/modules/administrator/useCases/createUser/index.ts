import { BaseUseCase, IResultT, ResultT, Result } from "../../../../shared/useCase/BaseUseCase";
import { CreateUserDto } from "../../../../modules/administrator/dto/CreateUserDto";
import AppSettings from "../../../../shared/settings/AppSettings";
import { IAdminRepository } from "../../ports/IAdminRepository";
import encryptionUtils from "../../../../shared/utils/EncryptionUtils";
import dateTimeUtils from '../../../../shared/utils/DateTimeUtils';
import { User } from "@/domain/user/User";
import { ISession } from "@/domain/session/ISession";
import {IUserRepository} from "@/application/modules/user/ports/IUserRepository";

export class CreateUserUseCase extends BaseUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly userRepository: IUserRepository;

    public constructor(adminRepository: IAdminRepository, userRepository: IUserRepository) {
        super();
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    async execute(user: CreateUserDto, session: ISession): Promise<IResultT<User>> {
        const result = new ResultT<User>();

        if (!this.isValidRequest(result, user)) {
            return result;
        }

        if(user.isAdmin && !session.isAdmin){
            result.setError(
                this.resources.get(this.resourceKeys.OPERATION_NOT_AUTHORIZED_ADMIN_ONLY),
                this.applicationStatusCode.UNAUTHORIZED
            );
            return result;
        }

        const doesUserExists = await this.userRepository.getUserByEmail(user.email);
        if (doesUserExists) {
            result.setError(
                this.resources.getWithParams(this.resourceKeys.EMAIL_ALREADY_IN_USE, {
                    email: user.email,
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const salt = encryptionUtils.getSalt(parseInt(AppSettings.EncryptionSaltRounds));
        const defaultPasswd = user.firstName + AppSettings.DefaultUserPasswd;
        const passwdHash = encryptionUtils.hashPassword(defaultPasswd, salt)

        user.password = passwdHash;
        user.createdAt = dateTimeUtils.getISONow();

        const wasRegistered: User = await this.adminRepository.createUser(user);
        if (!wasRegistered) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_CREATING_USER),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(wasRegistered, this.applicationStatusCode.CREATED);

        result.setMessage(
            this.resources.get(this.resourceKeys.USER_CREATED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;

    }


    private isValidRequest(result: Result, user: CreateUserDto): boolean {
        const validations = {};
        validations["email"] = user.email;
        validations["firstName"] = user.firstName;
        validations["lastName"] = user.lastName;

        return this.validator.isValidEntry(result, validations);
    }
}