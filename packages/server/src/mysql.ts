import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export function connect() {
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

    const db = mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PWD,
        database: MYSQL_DB,
        connectionLimit: 10,
    });

    db.connect((err) => {
        if (err) {
            console.error("Error connecting to database: ", err);
            return;
        }
        console.log("Connected to database");
    });

    return db;
}