import { createConnection, Connection } from "typeorm";
import AppSettings from "../../../application/shared/settings/AppSettings";
import logger from "../../../application/shared/logger";
import { User, Address } from '../../entity/index';

export class MySqlConnection {
    static host: string;
    static port: number = 3306;
    static username: string;
    static password: string;
    static database: string;
    static connectionLimit: number;
    static type: string;

    public static init() {
        this.connectionLimit = parseInt(AppSettings.MySQLConnectionLimit);
        this.host = AppSettings.MySQLHost;
        this.username = AppSettings.MySQLUser;
        this.password = AppSettings.MySQLPassword;
        this.database = AppSettings.MySQLDatabaseName;

        this.createConnection().then(() => {
            logger.info("Connected with MySQL !")}
        ).catch(e => {
            logger.error(e);
        });
    }

    public static async createConnection(): Promise<Connection> {
        return await createConnection({
            type: "mysql",
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            entities: [
                "src/infrastructure/entity/*.ts"
            ],
        });
    }

}


