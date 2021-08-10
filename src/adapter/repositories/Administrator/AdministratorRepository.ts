import {IAdminRepository} from "@/application/modules/administrator/ports/IAdminRepository";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";
import {User} from "@/domain/user/User";
import {UpdateUserDto} from "@/application/modules/administrator/dto/UpdateUserDto";


export class AdministratorRepository implements IAdminRepository{
    createUser(user: CreateUserDto): Promise<User> {
        return Promise.resolve(undefined);
    }

    deleteUser(id: number): Promise<string> {
        return Promise.resolve("");
    }

    updateUser(user: UpdateUserDto): Promise<User> {
        return Promise.resolve(undefined);
    }

}
