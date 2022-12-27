var mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
});

module.exports = connection;
