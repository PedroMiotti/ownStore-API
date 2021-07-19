import * as dotenv from "dotenv";

if (!process?.env?.NODE_ENV) {
    dotenv.config();
}

const dev = "development";

export default {
    Environment: process.env.NODE_ENV || dev,
    server: {
        Root: process.env.SERVER_ROOT || "/api",
        Host: process.env.SERVER_HOST || "localhost",
        Port: process.env.SERVER_PORT || 3005,
        Origins:
            process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
    },
    params: {
        envs: {
            Dev: dev,
            Test: "testing",
            Release: "release",
            Production: "production",
        },
        defaultApplicationError: {
            Code: "500",
            Message: "SOMETHING_WENT_WRONG",
        },
        security: {
            jwt: {
                SecretKey: process.env.JWT_SECRET_KEY,
                ExpireInSeconds: 3600,
            },
            EncryptionSaltRounds: process.env.ENCRYPTION_SALT_ROUNDS,
        },
        DefaultLang: "pt",
        mysql: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            databaseName: process.env.MYSQL_DATABASE_NAME,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
        }
    },
};
