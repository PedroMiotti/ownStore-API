// MySQL
import mysql = require("mysql");

import AppSettings from "../../../application/shared/settings/AppSettings";


export default class SqlPool {
  
	public static readonly pool = mysql.createPool({
    connectionLimit: parseInt(AppSettings.MySQLConnectionLimit),
    host: AppSettings.MySQLHost,
    user: AppSettings.MySQLUser,
    password: AppSettings.MySQLPassword,
    database: AppSettings.MySQLDatabaseName,
  });
  
}


