var mysql = require("mysql");

var conectebanco = mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"escola",
});

module.exports = conectebanco;