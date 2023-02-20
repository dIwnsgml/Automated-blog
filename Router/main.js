const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const pool = require('../model/pool');

Router.get("/", async (req, res) => {
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
    for(let j = 0; typeof articles[i][j] != 'undefined'; j++){
      articles[i][j].path = ('article/'+tables[i].Tables_in_automated_blog+'/'+articles[i][j].title).replaceAll(' ', "%20");
      if(articles[i][j].contents){
        articles[i][j].contents = articles[i][j].contents.replaceAll(';',"<br>")
      }
    }
    /* await connection.query("SELECT * FROM ??", [tables[i].Tables_in_automated_blog], (err, rows) => {
      for(let j = 0; typeof rows[j] != 'undefined'; j++){
        articles[i][j] = rows[j];
        articles[i][j].path = 'article'+''
      }
    }); */
  }
  res.render('index', {article: articles})
})
/* connection.query("SHOW TABLES", (err, rows) => {
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
 */

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