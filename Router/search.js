const express = require("express");
const app = express();
const Router = express.Router(); 
const pool = require('../model/pool');

Router.post("/", async(req, res) => {
  const query = req.body.query;
  const connection = await (await pool).getConnection()
  let tables = await connection.query("SHOW TABLES");

  let articles = [];
  for(let i = 0; i < tables.length; i++){
    //remove category table
    if(tables[i].Tables_in_automated_blog == "category"){
      tables.splice(i, 1);
      i -= 1;
      continue
    }
    articles[i] = await connection.query("SELECT * FROM ??", [tables[i].Tables_in_automated_blog]);
  }
  connection.release();
  res.render('search', {article: articles, categories: tables, query: query})
})

module.exports = Router;