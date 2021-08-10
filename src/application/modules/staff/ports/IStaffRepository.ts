import { User } from "@/domain/user/User";
import {Staff} from "@/domain/staff/Staff";


export interface IStaffRepository{
    getAllStaff(): Promise<Staff[]>;
}
