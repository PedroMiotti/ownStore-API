import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import {Staff} from "@/domain/staff/Staff";
import {IStaffRepository} from "@/application/modules/staff/ports/IStaffRepository";


export class ListAllStaffUseCase extends BaseUseCase{
    private readonly staffRepository: IStaffRepository;

    public constructor(staffRepository: IStaffRepository) {
        super();
        this.staffRepository = staffRepository;
    }

    async execute(): Promise<IResultT<Staff[]>>{
        const result = new ResultT<Staff[]>()

        const users = await this.staffRepository.getAllStaff();

        if(users.length >= 1)
            users.forEach(user => user.password = null);

        result.setData(users, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.USERS_RETRIEVED_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }
}