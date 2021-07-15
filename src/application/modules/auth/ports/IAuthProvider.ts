import { UserLoginDto } from "../dto/UserLoginDto";
import { User } from "../../../../domain/user/User";
import { ISession } from "../../../../domain/Session/ISession";
import { TokenDto } from "../dto/TokenDto";

export interface IAuthProvider {
    login(user: UserLoginDto): Promise<User>;
    getJwt(session: ISession): Promise<string>;
    verifyJwt(jwt: string): Promise<ISession>;
}