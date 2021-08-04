import {createConnection, Connection} from "typeorm";
import AppSettings from "@/application/shared/settings/AppSettings";
import logger from "@/application/shared/logger";

export default class MySqlConnection {
    static host: string;
    static port: number = 3306;
    static user: string;
    static password: string;
    static database: string;
    static connectionLimit: number;

    public static init() {
        this.connectionLimit = parseInt(AppSettings.MySQLConnectionLimit);
        this.host = AppSettings.MySQLHost;
        this.user = AppSettings.MySQLUser;
        this.password = AppSettings.MySQLPassword;
        this.database = AppSettings.MySQLDatabaseName;

        this.createConnection().then(() => {logger.info("Connection with mysql successful !")}).catch(e => {
            logger.error(e);
        });
    }

    public static createConnection(): Promise<Connection> {
        return createConnection({
            type: "mysql",
            host: this.host,
            port: this.port,
            username: this.user,
            password: this.password,
            database: this.database,
            extra: {
                connectionLimit: this.connectionLimit
            },
            entities: [
                "src/infrastructure/entity/**/*.ts"
            ],
            migrations: [
                "src/infrastructure/migrations/**/*.ts"
            ]
        });
    }

}