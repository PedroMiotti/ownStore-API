import { UserLoginDto } from "../dto/UserLoginDto";
import { User } from "@/domain/user/User";
import { ISession } from "@/domain/session/ISession";

export interface IAuthProvider {
    login(user: UserLoginDto): Promise<User>;
    getJwt(session: ISession): Promise<string>;
    verifyJwt(jwt: string): Promise<ISession>;
}