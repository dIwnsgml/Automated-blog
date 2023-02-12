const express = require("express");
const Router = express.Router();
const connection = require('../../model/db');
const info = require("../../config/info.json")
const app = express();
console.log('a')
Router.get('/', (req, res) => {
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  res.render('admin/manage/article');
})



module.exports = Router