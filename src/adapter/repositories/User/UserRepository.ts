import { BaseRepository } from "@/adapter/repositories/base/BaseRepository";
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";
import { User } from "@/domain/user/User";
import {getRepository} from "typeorm";
import {User as UserEntity} from "@/infrastructure/entity/User";
import {UserDto} from "@/infrastructure/models/user/dto/UserDto";
import mapper from "mapper-tsk";


export class UserRepository extends BaseRepository implements IUserRepository{
    async getUserByEmail(email: string): Promise<User> {
        const userRepository = getRepository(UserEntity);
        const u: UserDto | undefined = await userRepository.findOne({ email });

        if(!u)
            return null;

        return mapper.mapObject(u, new User());
    }

    getUserById(id: number): Promise<User> {
        return Promise.resolve(undefined);
    }

}