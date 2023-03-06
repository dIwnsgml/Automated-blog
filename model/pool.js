const mysql = require("promise-mysql");
const info = require("../config/info.json");
const pool = mysql.createPool({
  host: info.database.host,
  user: info.database.user,
  password: info.database.password,
  database: info.database.name,
  acquireTimeout : 30000,
  connectTimeout : 10000,
  multipleStatements: true,
  connectionLimit: 200,
  waitForConnections: true,
});

module.exports = pool;