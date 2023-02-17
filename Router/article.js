const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const async = require("async");
const pool = require('../model/pool');




Router.get('/:category/:title', async (req, res) => {
  let category = req.params.category;
  let title = req.params.title;
  console.log(category, title)
  /* connection.query(`SELECT * FROM ?? WHERE title = ?`, [category, title] ,(err, rows) => {
    if(rows[0])
    console.log
    res.render('article', {article: rows[0]});
  }) */
  console.log(' ' + title)
  const connection = await (await pool).getConnection()
  const article = await connection.query("SELECT * FROM ?? WHERE title = ?", [category, ' ' + title]);
  res.render('article', {article: article[0]})
})



module.exports = Router;