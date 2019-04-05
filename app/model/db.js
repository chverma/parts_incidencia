'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
  	user: process.env.MYSQL_USER,
  	password: process.env.MYSQL_PASSWD,
  	database: process.env.MYSQL_DB
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;