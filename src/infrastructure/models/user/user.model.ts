import {UserLoginDto} from "@/application/modules/auth/dto/UserLoginDto";
import {User} from "@/domain/user/User";
import Sql from "@/infrastructure/database/mysql/sql";
import mapper from "mapper-tsk";


class UserModel {
    async login(user: UserLoginDto): Promise<User> {
        let domainUser;

        await Sql.conectar(async (sql: Sql) => {
            const founded = await sql.query("select * from userd where password = ?", [user.email]);
            if(founded.length === 0 || !founded)
                return null;

            domainUser = mapper.mapObject(founded, new User());
        })

        return domainUser;
    }
}

export default new UserModel();