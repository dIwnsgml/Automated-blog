const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");
const async = require("async");

var article = [];
connection.query("SHOW TABLES", (err, rows) => {
  for(let i = 0; typeof rows[i] != 'undefined'; i++){
    async.waterfall([
      function(callback){
        var type = rows[i].Tables_in_automated_blog
        connection.query(`SELECT * FROM ??`, [type] ,(err, rows) => {
          for(let j = 0; typeof rows[j] != 'undefined'; j++){
            if(j == 0){
              article[i] = []
            }
            article[i][j] = rows[j];
            article[i][j].path = 'article/' + type + '/--'+ article[i][j].title;
            article[i][j].path = article[i][j].path.replace("/-- ", "/");
            article[i][j].path = article[i][j].path.replaceAll(" ", "%20");
            console.log(article[i][j].path)
            /* console.log(article.length) */
          }
          callback(null, article)
        })
      }, 
    ])
  }
  Router.get('/', (req, res) => {
    console.log(article.length, article[1][1].path)
    res.render('index', {article:article});
  })
})


Router.get('/robots.txt', (req, res) => {
  res.render("robots.txt");
  console.log(article.length)
});

Router.get('/sitemap.xmal', (req, res) => {
  res.render('sitemap.xml');
});

Router.get('/ads.txt', (req, res) => {
  res.render('ads.txt');
});

module.exports = Router;