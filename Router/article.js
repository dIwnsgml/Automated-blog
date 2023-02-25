const express = require("express");
let Router = express.Router();
const info = require("../config/info.json");
const pool = require('../model/pool');

Router.post('/getArticle/:category/:title', async(req, res) => {
  let category = req.params.category;
  let title = req.params.title;
  console.log(category, 'sdfff', title)
  const connection = await (await pool).getConnection();
  const article = await connection.query("SELECT * FROM ?? WHERE title = ?", [category, title]);
  connection.release();
  res.send(article[0]);
})

Router.post('/getRelatedArticles/:category', async(req, res) => {
  let category = req.params.category;
  const connection = await (await pool).getConnection();
  const articles = await connection.query("SELECT * FROM ??", [category]);
  connection.release();
  res.send(articles);
})

Router.get('/:category/:title', async (req, res) => {
  res.render('article');
})

Router.post('/:category/:title/:like', async(req, res) => {
  let category = req.params.category;
  let title = req.params.title;
  const connection = await (await pool).getConnection();
  connection.query("UPDATE ?? set likes=likes+1 WHERE title = ?", [category, title]);
  connection.query("UPDATE category set likes=likes+1 WHERE name = ?", [category]);
  connection.release();
  res.sendStatus(200);
})

module.exports = Router;