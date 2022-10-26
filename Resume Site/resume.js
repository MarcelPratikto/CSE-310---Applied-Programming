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
    var col_string = ``;
    for(let i = 0; i < col.length; i++){
        if (i == 0){
            col_string += `(id INT AUTO_INCREMENT PRIMARY KEY, ${col[i]} VARCHAR(255), `;
        } else if (i == col.length - 1) {
            col_string += `${col[i]} VARCHAR(255))`;
        } else {
            col_string += `${col[i]} VARCHAR(255), `;
        }
    }

    var sql = `CREATE TABLE ${table_name} ${col_string}`;
    con.query(sql, function(err, result){
        if (err) throw err;
        console.log(`Table created: ${table_name}`);
    });
}
// deletes a table
function deleteTable(con, table_name){
    var sql = `DROP TABLE ${table_name}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Table deleted: ${table_name}`);
    });
}
// add column to table
function addColumn(con, table_name, col){
    var sql = `ALTER TABLE ${table_name} ADD COLUMN ${col} VARCHAR(255)`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Added ${col} to ${table_name}`);
    });
}
// delete column from table
function deleteColumn(con, table_name, col){
    var sql = `ALTER TABLE ${table_name} DROP COLUMN ${col}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Dropped ${col} from ${table_name}`);
    });
}
// insert data into table using column names
function insertData(con, table_name, dict){
    var keys = [];
    var values = [];
    for (var key in dict){
        val = dict[key];
        keys.push(key);
        values.push(val);        
    }
    console.log(`keys: ${keys} [${keys.length}]\nvalue: ${values} [${values.length}]`);
    var keys_string = ``;
    var values_string = ``;
    for (let i=0; i < keys.length; i++){
        if (i == keys.length - 1){
            keys_string += `${keys[i]}`;
            values_string += `'${values[i]}'`;
        } else {
            keys_string += `${keys[i]}, `;
            values_string += `'${values[i]}', `;
        }
    }
    console.log(`keys_string: ${keys_string}\nvalues_string: ${values_string}`);
    var sql = `INSERT INTO ${table_name} (${keys_string}) VALUES (${values_string})`;
    con.query(sql, function (err, result) {
        if (err) throw err;        
    });
    console.log(`Inserted (${keys_string}) (${values_string}) to ${table_name}`);
}
// print table
function printData(con, table_name, col=null){
    var sql = ``;
    if (col == null){
        sql = `SELECT * FROM ${table_name}`;
    } else {
        if (col.length == 1){
            sql = `SELECT ${col[0]} FROM ${table_name}`;
            //console.log(sql);
        } else{
            for(let i = 0; i < col.length; i++){
                if (i == 0){
                    sql += `SELECT ${col[i]}, `;
                } else if (i == col.length - 1) {
                    sql += `${col[i]} FROM ${table_name}`;
                } else {
                    sql += `${col[i]}, `;
                }
            }
        }
    }
    var data = null;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`print data: `);
        console.log(result[0]);
        //data = result;
    });
    //return data;
}


// MAIN
function main(){
    // start connect
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    // name of table
    var table_name = "experience";
    // if table already exists, delete it
    //deleteTable(con, table_name);

    // do stuff
    var experience_col = ["company_name", "title", "location", "start_date", "end_date"];
    createTable(con, table_name, experience_col);
    addColumn(con, table_name, "description");
    insertData(con, table_name, {"company_name":"Vivint", "title":"Smart Home Pro"});
    // var data = printData(con, "experience");
    // console.log(`data: ${data}`);
    printData(con, table_name, ["company_name"]);
    printData(con, table_name, ["title", "company_name"]);
    printData(con, table_name);

    // delete table
    deleteTable(con, table_name);
    // end connection
    con.end();
}
main()