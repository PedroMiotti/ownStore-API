import {UserLoginDto} from "@/application/modules/auth/dto/UserLoginDto";
import {IAuthProvider} from "@/application/modules/auth/ports/IAuthProvider";
import {ISession} from "@/domain/session/ISession";
import {User} from "@/domain/user/User";
import { BaseProvider } from "../base/BaseProvider";
import {sign, verify} from "jsonwebtoken";
import AppSettings from "@/application/shared/settings/AppSettings";
import UserModel from "@/infrastructure/models/user/user.model";
import logger from "@/application/shared/logger";

export class AuthProvider extends BaseProvider implements IAuthProvider {
    login(user: UserLoginDto): Promise<User> {

        return UserModel.login(user)
            .then((user: User) => {
                return user;
            }).catch((e) => {
                logger.error("Error when user tries to login: ", e);
                return Promise.reject(e);
            });
    }

    getJwt(session: ISession): Promise<string> {
        const token = sign(session, AppSettings.JWTEncryptionKey, {
            algorithm: "HS512",
            expiresIn: AppSettings.JWTExpirationTime,
        });
        return Promise.resolve(token);
    }

    verifyJwt(jwt: string): Promise<ISession> {
        const session: ISession = verify(jwt, AppSettings.JWTEncryptionKey) as ISession;
        return Promise.resolve(session);
    }

}