import { BaseUseCase, IResultT, ResultT } from "../../../../..../../shared/useCase/BaseUseCase";
import { IAdminRepository } from "../../../../..../../modules/administrator/ports/AdminRepository";
import { User } from "@/domain/user/User";


export class ListAllUsersUseCase extends BaseUseCase{
    private readonly adminRepository: IAdminRepository;

    public constructor(adminRepository: IAdminRepository) {
        super();
        this.adminRepository = adminRepository;
    }

    async execute(): Promise<IResultT<User[]>>{
        const result = new ResultT<User[]>()

        const users = await this.adminRepository.getAllUsers();

        result.setData(users, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.USERS_RETRIEVED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }
}