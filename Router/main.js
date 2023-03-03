const express = require("express");
const Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const pool = require('../model/pool');
const fs = require("fs");

Router.get("/", async (req, res) => {
  
  res.render('index', {})
})

Router.post("/subscribe/:email", async (req, res) => {
  const connection = await (await pool).getConnection();
  const email = req.params.email;
  console.log(email)
  let subscibe = await connection.query("INSERT INTO subscribers set ?", [{email: email}])
})

Router.post('/sort/:category', async (req, res) => {
  const connection = await (await pool).getConnection();
  let category = req.params.category;
  console.log(category)
  let articles = [];
  let categories = await connection.query("SELECT * FROM category");
  connection.release();
  if(category == "all"){
    for(let i = 0; i < categories.length; i++){
      //remove category table
      if(categories[i].Tables_in_automated_blog == "category"){
        categories.splice(i, 1);
        i -= 1;
        continue
      }
      articles[i] = await connection.query("SELECT * FROM ??", [categories[i].name]);
    }
  } else {
    articles[0] = await connection.query("SELECT * FROM ??", [category]);
  }

  res.send({article: articles});
})

Router.post('/getCategories', async (req, res) => {
  const connection = await (await pool).getConnection();
  let categories = await connection.query("SELECT * FROM category");
  connection.release();
  res.send(categories);  
})

Router.post('/getArticles', async (req, res) => {
  const connection = await (await pool).getConnection();
  let categories = await connection.query("SELECT * FROM category");

  let articles = [];
  for(let i = 0; i < categories.length; i++){
    articles[i] = await connection.query("SELECT * FROM ??", [categories[i].name]);
  }
  connection.release();
  res.send(articles);
})

Router.post('/getArticlesforCategory/:category', async (req, res) => {
  const connection = await (await pool).getConnection();

  const category = req.params.category;

  let articles
  try {
    articles = await connection.query("SELECT * FROM ??", [category]);
  } catch(err) {
    console.log(err)
  }
  connection.release();
  res.send(articles);
})

Router.get('/about-us', async(req, res) => {
  res.render("about");
})

Router.get('/privacy-policy', async(req, res) => {
  res.render("privacy-policy");
})

Router.get('/terms-of-use', async(req, res) => {
  res.render("terms-of-use");
})

Router.get('/contact', async(req, res) => {
  res.render("contact", {});
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