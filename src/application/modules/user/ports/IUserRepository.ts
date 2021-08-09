import { User } from "@/domain/user/User";


export interface IUserRepository{
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<User>;
    getAllStaffUsers(): Promise<User[]>;
}
