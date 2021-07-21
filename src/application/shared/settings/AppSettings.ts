export default class AppSettings {
    static DefaultLang: string;
    static ServerRoot: string;
    static ServerPort: string;
    static ServerHost: number;
    static ServerOrigins: string;
    
    static EncryptionSaltRounds: string;
    static JWTEncryptionKey: string;
    static JWTExpirationTime: number;

    static MySQLHost: string;
    static MySQLUser: string;
    static MySQLPassword: string;
    static MySQLDatabaseName: string;
    static MySQLConnectionLimit: string;


    static init(config: { [key: string]: any }): void {
        this.DefaultLang = config.params.DefaultLang;
        this.ServerRoot = config.server.Root;
        this.ServerHost = config.server.Host;
        this.ServerPort = config.server.Port;
        this.ServerOrigins = config.server.Origins;

        this.EncryptionSaltRounds = config.params.security.EncryptionSaltRounds;
        this.JWTEncryptionKey = config.params.security.jwt.SecretKey;
        this.JWTExpirationTime = config.params.security.jwt.ExpireInSeconds;

        this.MySQLHost = config.params.mysql.host;
        this.MySQLUser = config.params.mysql.user;
        this.MySQLPassword = config.params.mysql.password;
        this.MySQLDatabaseName = config.params.mysql.databaseName;
        this.MySQLConnectionLimit = config.params.mysql.connectionLimit;


    }
}