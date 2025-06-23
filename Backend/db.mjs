import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    password: "More11@7",
    database:"my_database"
})

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

db.connect(function(err,res) {
    if (err) {
        console.log("Error in connectind database",err)
    }
    else{
        console.log("connected successfully.")
    }
})
    // module.export = connection;
    export default db;