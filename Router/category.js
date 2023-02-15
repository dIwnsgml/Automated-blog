const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");
const async = require("async");

Router.get('/:tagId', (req, res) => {
  console.log(req.params.tagId)
  var article = [];

  connection.query(`SELECT * FROM ??`, [req.params.tagId] ,(err, rows) => {
    for(let i = 0; typeof rows[i] != 'undefined'; i++){
      article[i] = rows[i];
    }
    res.render('category', {article:article});
  })
})



module.exports = Router;