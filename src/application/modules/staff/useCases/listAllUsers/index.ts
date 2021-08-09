import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAdminRepository } from "../../../administrator/ports/IAdminRepository";
import { User } from "@/domain/user/User";


export class ListAllStaffUseCase extends BaseUseCase{
    private readonly userRepository: IAdminRepository;

    public constructor(adminRepository: IAdminRepository) {
        super();
        this.userRepository = adminRepository;
    }

    async execute(): Promise<IResultT<User[]>>{
        const result = new ResultT<User[]>()

        const users = await this.userRepository.getAllUsers();

        result.setData(users, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.USERS_RETRIEVED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }
}