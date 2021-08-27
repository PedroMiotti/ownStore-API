import * as dotenv from "dotenv";

if (!process?.env?.NODE_ENV) {
    dotenv.config();
}
const options = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    extra: {
        connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
    },
    entities: [
        "src/infrastructure/entity/*.ts"
    ],
    migrations: [
        "src/infrastructure/migrations/*.ts"
    ],
    cli: {
        entitiesDir: "src/infrastructure/entity",
        migrationsDir: "src/infrastructure/migrations",
        subscribersDir: "src/infrastructure/subscriber"
    }
}

export = options;