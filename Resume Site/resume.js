var mysql = require('mysql');
//console.log(mysql)

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!1RootPassword",
    database: "mydb"
});

// initial database setup, probably won't need to use again
// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//         if (err) throw err;
//         console.log("Database Created");
//       });
// });

// creates a table in database
// con: connection
// name: name of table
// col: array of columns
// TODO if the loop doesn't work: name, type, b_date, e_date, desc
function createTable(con, table_name, col){
    col_string = ``
    for(var i = 0; i < col.length; i++){
        if (i == 0){
            col_string += `(id INT AUTO_INCREMENT PRIMARY KEY, ${col[i]} VARCHAR(255), `;
        } else if (i == col.length - 1) {
            col_string += `${col[i]} VARCHAR(255))`;
        } else {
            col_string += `${col[i]} VARCHAR(255), `;
        }
    }
    var sql = `CREATE TABLE ${table_name} ${col_string}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table created: ${table_name}`);
    });
}

function deleteTable(con, table_name){
    var sql = `DROP TABLE ${table_name}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table deleted: ${table_name}`);
    });
}

// add column to a table
function addColumn(con, table_name, col){
    var sql = `ALTER TABLE ${table_name} ADD COLUMN ${col} VARCHAR(255)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Added ${col} to ${table_name}`);
    });
}



// MAIN
function main(){
    // start connect
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var experience_col = ["company_name", "title", "location", "start_date", "end_date"];
    createTable(con, "experience", experience_col);
    addColumn(con, "experience", "description");
    deleteTable(con, "experience");
    // end connection
    con.end();
}
main()