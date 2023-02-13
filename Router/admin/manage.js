const express = require("express");
const Router = express.Router();
const connection = require('../../model/db');
const info = require("../../config/info.json")
const { Configuration, OpenAIApi } = require("openai");


Router.get('/article', (req, res) => {
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  res.render('admin/manage/article');
})

Router.get('/category', (req, res) => {
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  res.render('admin/manage/category');
})

Router.post('/category/create', (req, res) => {
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  (async () => {
    const configuration = new Configuration({
      apiKey: info.OpenAiApi,
    });
    const openai = new OpenAIApi(configuration);
    
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "think about what language should be thaought in programming blog(only say the name of the language without explanation and exept python and javascript)",
        max_tokens: 1000,
        temperature: 0,
      });
      console.log(completion.data.choices[0].text);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  })();
})


module.exports = Router