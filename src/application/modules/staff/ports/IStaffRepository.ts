import { User } from "@/domain/user/User";


export interface IStaffRepository{
    getAllStaffUsers(): Promise<[]>;
}
