var mysql = require("mysql");
var connection = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_anlyn",
  password: "9nhQjD#jMJcF46?",
  database: "freedb_MetaMusic",
});

module.exports = connection;
