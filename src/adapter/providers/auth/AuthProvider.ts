import { UserLoginDto } from "../../../application/modules/auth/dto/UserLoginDto";
import { IAuthProvider } from "../../../application/modules/auth/ports/IAuthProvider";
import { ISession } from "../../../domain/session/ISession";
import { User } from "../../../domain/user/User";
import { BaseProvider } from "../base/BaseProvider";
import { sign, verify } from "jsonwebtoken";
import AppSettings from "../../../application/shared/settings/AppSettings";
import UserModel from "../../../infrastructure/models/user/user.model";

export class AuthProvider extends BaseProvider implements IAuthProvider{
    login(user: UserLoginDto): Promise<User> {
        return UserModel.login(user);
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