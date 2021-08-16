import { IStaffRepository } from "@/application/modules/staff/ports/IStaffRepository";
import { Staff } from "@/domain/staff/Staff";
import UserModel from "@/infrastructure/models/user/user.model";
import { User } from "@/domain/user/User";
import logger from "@/application/shared/logger";


export class StaffRepository implements IStaffRepository{
    getAllStaff(): Promise<Staff[]> {
        return UserModel.getAllStaffUsers()
            .then((users: User[]) => {
                return users;
            }).catch((e) => {
                logger.error("Error when retrieving all staff users : ", e);
                return Promise.reject(e);
            });
    }
}