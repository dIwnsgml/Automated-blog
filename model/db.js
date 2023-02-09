const mysql = require("mysql");
const info = require("../config/info.json");

//local
const conn = mysql.createConnection({
  host: info.database.host,
  user: info.database.user,
  password: info.database.password,
  database: info.database.name,
  acquireTimeout : 10000,
  connectTimeout : 10000,
  multipleStatements: true,
})


conn.connect(function(error){
  if(error){
    console.log(error);
  }else{
    console.log("connected");
  }
})

module.exports = conn;