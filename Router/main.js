const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");


connection.query("SELECT * FROM scala", (err, rows) => {
  console.log(rows[0].title);
});

Router.get('/', (req, res) => {
  connection.query("SHOW TABLES", (err, rows) => {
    var article = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    (async() => {
      for(let i = 1; typeof rows[i] != 'undefined'; i ++){
        /* console.log(rows[i].Tables_in_automated_blog) */
        connection.query(`SELECT * FROM ??`, [rows[i].Tables_in_automated_blog], (err, rows) => {
          console.log('aa')
          for(let j = 0; typeof rows[j] != 'undefined'; j++){
            /* console.log(rows[j].title); */
            article[i][j] = rows[j];
          }
        })
      };
      
      await res.render('index', {article: article});
      console.log(article)
    })();
  })
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