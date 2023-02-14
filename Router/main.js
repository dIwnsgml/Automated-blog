const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");
const async = require("async");

connection.query("SELECT * FROM scala", (err, rows) => {
  console.log(rows[0].title);
});
var article = [];
connection.query("SHOW TABLES", (err, rows) => {
  for(let i = 0; typeof rows[i] != 'undefined'; i++){
    async.waterfall([
      function(callback){
        connection.query(`SELECT * FROM ??`, [rows[i].Tables_in_automated_blog] ,(err, rows) => {
          for(let j = 0; typeof rows[j] != 'undefined'; j++){
            if(j == 0){
              article[i] = []
            }
            article[i][j] = rows[j];
          }
          callback(null, article)
        })
      }, 
    ])
  }
})

Router.get('/', (req, res) => {
  console.log(article[1][0].text)
  res.render('index', {article:article});
})


Router.get('/robots.txt', (req, res) => {
  res.render("robots.txt");
});

Router.get('/sitemap.xmal', (req, res) => {
  res.render('sitemap.xml');
});

Router.get('/ads.txt', (req, res) => {
  res.render('ads.txt');
});

module.exports = Router;