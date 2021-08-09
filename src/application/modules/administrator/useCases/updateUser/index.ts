import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAdminRepository } from "../../ports/IAdminRepository";
import { ISession } from "@/domain/session/ISession";
import { User } from "@/domain/user/User";
import { UpdateUserDto } from "../../../../modules/administrator/dto/UpdateUserDto";


export class UpdateUserUseCase extends BaseUseCase{
    private readonly adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        super();
        this.adminRepository = adminRepository;
    }

    async execute(user: UpdateUserDto, session: ISession): Promise<IResultT<User>>{
        const result = new ResultT<User>();

        if(user.isAdmin && !session.isAdmin){
            result.setError(
                this.resources.get(this.resourceKeys.OPERATION_NOT_AUTHORIZED_ADMIN_ONLY),
                this.applicationStatusCode.UNAUTHORIZED
            );
            return result;
        }

        const doesUserExists: User = await this.adminRepository.getUserById(parseInt(user.id));
        if(!doesUserExists){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        if(doesUserExists.email !== user.email){
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
        }

        if(doesUserExists.isAdmin !== user.isAdmin){
            if(!session.isAdmin){
                result.setError(
                    this.resources.get(this.resourceKeys.OPERATION_NOT_AUTHORIZED_ADMIN_ONLY),
                    this.applicationStatusCode.UNAUTHORIZED
                );
                return result;
            }
        }

        const wasUpdated: User = await this.adminRepository.updateUser(user);
        if (!wasUpdated) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_USER),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(wasUpdated, this.applicationStatusCode.CREATED);

        result.setMessage(
            this.resources.get(this.resourceKeys.USER_UPDATED_SUCCESSFULLY),
            this.applicationStatusCode.CREATED,
        );

        return result;
    }
}