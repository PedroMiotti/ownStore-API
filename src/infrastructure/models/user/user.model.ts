import {UserLoginDto} from "@/application/modules/auth/dto/UserLoginDto";
import {User} from "@/domain/user/User";
import Sql from "@/infrastructure/database/mysql/sql";
import mapper from "mapper-tsk";
import applicationStatus from "@/application/shared/status/applicationStatusCodes";


import * as dbData from "./db.mock.json";

class UserModel {
    async login(user: UserLoginDto): Promise<User> {
        let domainUser;

        await Sql.conectar(async (sql: Sql) => {
            const founded = await sql.query("select * from usefefer where password = ?", [user.email]);

            domainUser = mapper.mapObject(founded, new User());
        }).catch(e => {
            console.log("ERROR 1" + e);
            return e;
        });


        return domainUser;

    }

}

export default new UserModel();