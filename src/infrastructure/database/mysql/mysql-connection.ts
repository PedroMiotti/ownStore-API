// MySQL
import mysql = require("mysql");
import AppSettings from "@/application/shared/settings/AppSettings";
import { Pool } from "mysql";

export default class SqlPool {
    static connectionLimit: number;
    static host: string;
    static user: string;
    static password: string;
    static database: string;

    public static init(){
        this.connectionLimit =  parseInt(AppSettings.MySQLConnectionLimit);
        this.host = AppSettings.MySQLHost;
        this.user = AppSettings.MySQLUser;
        this.password = AppSettings.MySQLPassword;
        this.database = AppSettings.MySQLDatabaseName;
    }
    
	public static createConnectionPool(): Pool{
        return mysql.createPool({
            connectionLimit: this.connectionLimit,
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
        });
    }


}


