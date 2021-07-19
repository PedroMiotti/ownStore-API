// MySQL
import mysql = require("mysql");

import AppSettings from "@/application/shared/settings/AppSettings";



export = class SqlPool {
	public static readonly pool = mysql.createPool({
    connectionLimit: AppSettings.MySQLConnectionLimit,
    host: AppSettings.MySQLHost,
    user: AppSettings.MySQLUser,
    password: AppSettings.MySQLPassword,
    database: AppSettings.MySQLDatabaseName,
  });
}
