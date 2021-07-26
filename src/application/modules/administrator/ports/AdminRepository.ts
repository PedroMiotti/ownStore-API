import { User } from "@/domain/user/User";


export interface IAdminRepository{
    createUser(user): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<User>;

}