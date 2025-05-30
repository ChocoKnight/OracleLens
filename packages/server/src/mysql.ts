import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PWD,
    database: MYSQL_DB,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export default pool;