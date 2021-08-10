import { BaseRepository } from "@/adapter/repositories/base/BaseRepository";
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";
import { User } from "@/domain/user/User";


export class UserRepository extends BaseRepository implements IUserRepository{
    getUserByEmail(email: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    getUserById(id: number): Promise<User> {
        return Promise.resolve(undefined);
    }

}