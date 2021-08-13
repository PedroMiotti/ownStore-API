import { BaseUseCase, IResult, Result } from "../../../..//shared/useCase/BaseUseCase";
import { IAdminRepository } from "../../ports/IAdminRepository";
import { ISession } from "@/domain/session/ISession";
import {IUserRepository} from "@/application/modules/user/ports/IUserRepository";
import {User} from "@/domain/user/User";


export class DeleteUserUseCase extends BaseUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly userRepository: IUserRepository;

    public constructor(adminRepository: IAdminRepository, userRepository: IUserRepository) {
        super();
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
    }

    async execute(id: number, session: ISession): Promise<IResult> {
        const result = new Result();

        if (!id) {
            result.setError(
                this.resources.getWithParams(this.resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                    missingParams: "id",
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        if (!session.isAdmin) {
            result.setError(
                this.resources.get(this.resourceKeys.DELETE_USER_NOT_AUTHORIZED),
                this.applicationStatusCode.UNAUTHORIZED
            );
            return result;
        }

        const doesUserExists: User = await this.userRepository.getUserById(id);
        if(!doesUserExists){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const deletedUser = await this.adminRepository.deleteUser(id);
        if(!deletedUser){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_DELETING_USER),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setMessage(
            this.resources.get(this.resourceKeys.USER_DELETED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;

    }


}