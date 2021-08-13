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
                logger.error("Error when creating staff user : ", e);
                return Promise.reject(e);
            });
    }

    deleteUser(id: number): Promise<string> {
        return UserModel.delete(id)
            .then((res: string) => {
                return res;
            }).catch((e) => {
                logger.error("Error when deleting staff user : ", e);
                return Promise.reject(e);
            });
    }

    updateUser(user: UpdateUserDto): Promise<User> {
        return UserModel.update(user)
            .then((user: User) => {
                return user;
            }).catch((e) => {
                logger.error("Error when updating staff user : ", e);
                return Promise.reject(e);
            });
    }

}
