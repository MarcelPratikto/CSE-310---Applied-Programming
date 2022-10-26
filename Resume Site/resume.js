var mysql = require('mysql');
//console.log(mysql)

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!1RootPassword"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
});