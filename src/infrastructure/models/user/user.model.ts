import { UserLoginDto } from "@/application/modules/auth/dto/UserLoginDto";
import { User } from "@/domain/user/User";
import mapper from "mapper-tsk";
import { getRepository } from "typeorm";
import { User as UserEntity } from '../../entity/User';
import { UserDto } from "@/infrastructure/models/user/dto/UserDto";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";
import { UpdateUserDto } from "@/application/modules/administrator/dto/UpdateUserDto";


class UserModel {
    // TODO -> Remove this ?
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

    async delete(id: number): Promise<string> {

        const userRepository = getRepository(UserEntity);

        await userRepository.delete(id);

        return "Deleted successfully";
    }

    async update(user: UpdateUserDto): Promise<User> {

        const userRepository = getRepository(UserEntity);
        const u = await userRepository.save({ ...user });

        if(!u)
            return null;

        return mapper.mapObject(u, new User());
    }

    async getUserByEmail(email: string): Promise<User> {
        const userRepository = getRepository(UserEntity);
        const u: UserDto | undefined = await userRepository.findOne({ email });

        if(!u)
            return null;

        return mapper.mapObject(u, new User());
    }

    async getUserById(id: number): Promise<User> {
        const userRepository = getRepository(UserEntity);
        const u: UserDto | undefined = await userRepository.findOne({ id });

        if(!u)
            return null;

        return mapper.mapObject(u, new User());
    }

    async getAllStaffUsers(): Promise<User[]> {
        const userRepository = getRepository(UserEntity);
        const users: UserDto[] | undefined = await userRepository.find({ where: { isStaff: true} });

        return mapper.mapArray<UserDto, User>(users, () => mapper.activator(User));

    }

    async getAllCustomerUsers(): Promise<User[]> {
        const userRepository = getRepository(UserEntity);
        const users: UserDto[] | undefined = await userRepository.find({ where: { isStaff: false} });

        return mapper.mapArray<UserDto, User>(users, () => mapper.activator(User));
    }
}

export default new UserModel();

