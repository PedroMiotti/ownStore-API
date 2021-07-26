import {UserLoginDto} from "@/application/modules/auth/dto/UserLoginDto";
import {User} from "@/domain/user/User";
import Sql from "@/infrastructure/database/mysql/sql";
import mapper from "mapper-tsk";
import applicationStatus from "@/application/shared/status/applicationStatusCodes";


import * as dbData from "./db.mock.json";

class UserModel {
    async login(user: UserLoginDto): Promise<User> {
        let domainUser;

        // await Sql.conectar(async (sql: Sql) => {
        //     return new Promise(( async (resolve, reject) => {
        //         try{
        //             const founded = await sql.query("select * from usefefer where password = ?", [user.email]);
        //
        //             domainUser = mapper.mapObject(founded, new User());
        //             resolve(domainUser);
        //         }
        //         catch (e) {
        //             console.log(e)
        //             reject(e);
        //         }
        //     }))
        //
        // })

        try {
            await Sql.conectar(async (sql: Sql) => {
                const founded = await sql.query("select * from usefefer where password = ?", [user.email]);

                domainUser = mapper.mapObject(founded, new User());

            })

            return domainUser;
        }
        catch (e){
            console.log(e)
        }

    }

}

export default new UserModel();