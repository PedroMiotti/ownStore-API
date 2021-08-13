import { BaseRepository } from "@/adapter/repositories/base/BaseRepository";
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";
import { User } from "@/domain/user/User";
import UserModel from "@/infrastructure/models/user/user.model";
import logger from "@/application/shared/logger";


export class UserRepository extends BaseRepository implements IUserRepository{
    async getUserByEmail(email: string): Promise<User> {
        return UserModel.getUserByEmail(email)
            .then((user: User) => {
                return user;
            }).catch((e) => {
                logger.error("Error when retrieving user by email : ", e);
                return Promise.reject(e);
            });
    }

    async getUserById(id: number): Promise<User> {
        return UserModel.getUserById(id)
            .then((user: User) => {
                return user;
            }).catch((e) => {
                logger.error("Error when retrieving user by id : ", e);
                return Promise.reject(e);
            });
    }

}