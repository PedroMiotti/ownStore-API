import { BaseUseCase, IResult, Result } from "../../../..//shared/useCase/BaseUseCase";
import { IAdminRepository } from "../../../../modules/administrator/ports/AdminRepository";
import { ISession } from "@/domain/session/ISession";


export class DeleteUserUseCase extends BaseUseCase {
    private readonly adminRepository: IAdminRepository;

    public constructor(adminRepository: IAdminRepository) {
        super();
        this.adminRepository = adminRepository;
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