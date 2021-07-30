import { User } from "@/domain/user/User";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";
import {UpdateUserDto} from "@/application/modules/administrator/dto/UpdateUserDto";

export interface IAdminRepository{
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(user: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<string>;
    getAllUsers(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<User>;
}