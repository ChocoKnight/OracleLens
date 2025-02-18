import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// export function connect() {
//     const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

//     const db = mysql.createConnection({
//         host: MYSQL_HOST,
//         user: MYSQL_USER,
//         password: MYSQL_PWD,
//         database: MYSQL_DB,
//         connectionLimit: 10,
//     });

//     db.connect((err) => {
//         if (err) {
//             console.error("Error connecting to database: ", err);
//             return;
//         }
//         console.log("Connected to database");
//     });

//     return db;
// }

const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = process.env

// const db = mysql.createConnection({
//     host: MYSQL_HOST,
//     user: MYSQL_USER,
//     password: MYSQL_PWD,
//     database: MYSQL_DB,
//     connectionLimit: 10,
// });

// db.connect((err) => {
//     if (err) {
//         console.error("Error connecting to database: ", err);
//         return;
//     }
//     console.log("Connected to database");
// });

// export default db;

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PWD,
    database: MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export default pool;