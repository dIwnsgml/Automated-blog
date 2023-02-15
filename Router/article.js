const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");
const async = require("async");




Router.get('/:category/:title', (req, res) => {
  let category = req.params.category;
  let title = req.params.title;
  let article;
  console.log(category, title)
  connection.query(`SELECT * FROM ?? WHERE title = ?`, [category, title] ,(err, rows) => {
    /* res.send(rows[0].text) */
    res.render('article', {article: rows[0]});
  })

})



module.exports = Router;