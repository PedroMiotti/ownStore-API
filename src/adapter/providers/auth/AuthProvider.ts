import { UserLoginDto } from "@/application/modules/auth/dto/UserLoginDto";
import { IAuthProvider } from "@/application/modules/auth/ports/IAuthProvider";
import { ISession } from "@/domain/session/ISession";
import { User } from "@/domain/user/User";
import { ApplicationError, BaseProvider } from "../base/BaseProvider";
import { sign, verify } from "jsonwebtoken";
import AppSettings from "@/application/shared/settings/AppSettings";
import UserModel from "@/infrastructure/models/user/user.model";
import applicationStatus from "@/application/shared/status/applicationStatusCodes";

export class AuthProvider extends BaseProvider implements IAuthProvider{
    login(user: UserLoginDto): Promise<User> {
        return new Promise((resolve, reject) => {
            try{
                const userFound = UserModel.login(user);

                if(!userFound){
                    reject(null);
                }

                resolve(userFound);

            }catch (e) {
                console.log(e);
                throw new ApplicationError(
                    e.message,
                    e.code || applicationStatus.INTERNAL_ERROR,
                    JSON.stringify(e),
                );
            }
        })
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