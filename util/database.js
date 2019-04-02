const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-learn",
  password: "reflejo99"
});

module.exports = pool.promise();