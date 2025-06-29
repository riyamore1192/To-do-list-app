import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // optional, default is 3306
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect(function (err, res) {
    if (err) {
        console.log("Error in connectind database", err)
    }
    else {
        console.log("connected successfully.")
    }
})
export default db;

// db.query("SHOW DATABASES", (err, results) => {
//         if (err) {
//             console.error("Error running query:", err);
//             return;
//         }

//         console.log("Available Databases:");
//         results.forEach((row) => {
//             console.log("- " + row.Database);
//         });
//     });
