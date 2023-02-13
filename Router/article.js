const express = require("express");
const app = express();
let Router = express.Router();
const info = require("../config/info.json");
const { Configuration, OpenAIApi } = require("openai");
const connection = require("../model/db");
/* (async () => {
  const configuration = new Configuration({
    apiKey: info.OpenAiApi,
  });
  const openai = new OpenAIApi(configuration);
  
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "write a blog post about introductin to the javascript",
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
})(); */
/* const response = openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Correct this to standard English:\n\nShe went to the market to buy some apples\n\nShe went to the market to buy some apples.",
  temperature: 0,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
}); */
/* console.log(response.data); */
/* const options = {
  method: 'GET',
  url: 'https://www.instagram.com/' + 'account4socialn' + '/following',
  responseType: 'html',
  params: {session_key: '<REQUIRED>'},
  headers: {

  }
}; */
Router.get('/', (req, res) => {
  res.render('index')
})
/* axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
}); */
  /* req.session.error_msg = "";
  
  if (req.session.loggedin) {
    res.render('index', {
      button: "LOGOUT",
      name: req.session.name,
      path: "/account/logout",
    });
  } else {
    res.render('index', {
      button: "SIGN IN",
      name: req.session.name,
      path: "/account/login",
    });
  }
});

Router.get('/security', (req, res) => {
  if (req.session.loggedin) {
    res.render('security', {
      button: "LOGOUT",
      name: req.session.name,
      path: "/account/logout",
    });
  } else {
    res.render('security', {
      button: "SIGN IN",
      name: req.session.name,
      path: "/account/login",
    });
  }
})

Router.get('/privacy-notice', (req, res) => {
  if (req.session.loggedin) {
    res.render('privacy', {
      button: "LOGOUT",
      name: req.session.name,
      path: "/account/logout",
    });
  } else {
    res.render('privacy', {
      button: "SIGN IN",
      name: req.session.name,
      path: "/account/login",
    });
  }
})

Router.get('/terms-of-service', (req, res) => {
  if (req.session.loggedin) {
    res.render('service', {
      button: "LOGOUT",
      name: req.session.name,
      path: "/account/logout",
    });
  } else {
    res.render('service', {
      button: "SIGN IN",
      name: req.session.name,
      path: "/account/login",
    });
  } 
});*/

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