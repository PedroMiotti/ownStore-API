import { UserLoginDto } from "@/application/modules/auth/dto/UserLoginDto";
import { User } from "@/domain/user/User";
import Sql from "@/infrastructure/database/mysql/sql";
import mapper from "mapper-tsk";
import * as dbData from "./db.mock.json";

class UserModel{
    // async login(user: UserLoginDto): Promise<User> {
    //     await Sql.conectar(async (sql: Sql) => {

    //     })
    // }

    async login(user: UserLoginDto): Promise<User> {
        return new Promise((resolve, reject) => {
          const founded = dbData.users.find((user) => user.email === "pedromiotti@hotmail.com");

          if (!founded) {
            reject(null);
          }

          const domainUser = mapper.mapObject(founded, new User());

          resolve(domainUser);
        });
      }
}

export default new UserModel();