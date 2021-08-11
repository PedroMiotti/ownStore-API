import { UserLoginDto } from "@/application/modules/auth/dto/UserLoginDto";
import { User } from "@/domain/user/User";
import mapper from "mapper-tsk";
import { getRepository } from "typeorm";
import { User as UserEntity } from '../../entity/User';
import { UserDto } from "@/infrastructure/models/user/dto/UserDto";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";


class UserModel {
    async login(user: UserLoginDto): Promise<User> {

        const userRepository = getRepository(UserEntity);
        const u: UserDto | undefined = await userRepository.findOne({ email: user.email });

        if(!u)
            return null;

        return mapper.mapObject(u, new User());

    }

    async create(user: CreateUserDto): Promise<User> {

        const userRepository = getRepository(UserEntity);
        const u : UserDto | undefined = await userRepository.save(user);

        if(!u)
            return null;

        u.password = null;
        return mapper.mapObject(u, new User());

    }
}

export default new UserModel();

