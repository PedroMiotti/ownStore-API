import {IAdminRepository} from "@/application/modules/administrator/ports/IAdminRepository";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";
import {User} from "@/domain/user/User";
import {UpdateUserDto} from "@/application/modules/administrator/dto/UpdateUserDto";
import UserModel from "@/infrastructure/models/user/user.model";
import logger from "@/application/shared/logger";


export class AdministratorRepository implements IAdminRepository {
    createUser(user: CreateUserDto): Promise<User> {
        return UserModel.create(user)
            .then((user: User) => {
                return user;
            }).catch((e) => {
                logger.error("Error when user tries to login: ", e);
                return Promise.reject(e);
            });
    }

    deleteUser(id: number): Promise<string> {
        return Promise.resolve("");
    }

    updateUser(user: UpdateUserDto): Promise<User> {
        return Promise.resolve(undefined);
    }

}
