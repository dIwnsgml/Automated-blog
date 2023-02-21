const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
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
  const connection = await (await pool).getConnection();
  //add view +=1 
  connection.query("UPDATE category set views=views+1 WHERE name = ?", [category]);
  connection.query("UPDATE ?? set views=views+1 WHERE title = ?", [category, title]);
  const article = await connection.query("SELECT * FROM ?? WHERE title = ?", [category,title]);
  const related_articles = await connection.query("SELECT * FROM ??", [category]);
  article[0].contents = article[0].contents.replaceAll(";", "<br>");
  for(let i = 0; typeof related_articles[i] != 'undefined'; i++){
    related_articles[i].contents = related_articles[i].contents.replaceAll(";", "<br>");
  }

  res.render('article', {article: article[0], related_articles: related_articles});
})

Router.post('/:category/:title/:like', async(req, res) => {
  let category = req.params.category;
  let title = req.params.title;
  const connection = await (await pool).getConnection();
  connection.query("UPDATE ?? set likes=likes+1 WHERE title = ?", [category, title]);
  connection.query("UPDATE category set likes=likes+1 WHERE name = ?", [category]);
  res.sendStatus(200);
})

module.exports = Router;