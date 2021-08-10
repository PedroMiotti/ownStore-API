import {IStaffRepository} from "@/application/modules/staff/ports/IStaffRepository";
import {Staff} from "@/domain/staff/Staff";


export class StaffRepository implements IStaffRepository{
    getAllStaff(): Promise<Staff[]> {
        return Promise.resolve([]);
    }
}