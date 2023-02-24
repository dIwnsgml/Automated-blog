const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const pool = require("../model/pool");
const async = require("async");

Router.get('/:category', async(req, res) => {
  const category = req.params.category
  const connection = await (await pool).getConnection();
  const categories = await connection.query("SHOW TABLES");
  const articles = await connection.query("SELECT * FROM ??", [category]);
  res.render('category', {articles: articles, categories: categories})
  console.log(req.params.category)
})



module.exports = Router;