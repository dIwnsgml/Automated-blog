const express = require("express");
const Router = express.Router();
const connection = require('../../model/db');
const info = require("../../config/info.json");
const app = express();
const path = require("path");
Router.get('/', (req, res) => {
  if(req.session.loggedin){
    res.render("admin/main")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin)
})

const manageRouter = require("./manage");
Router.use('/manage', manageRouter);

Router.post('/authentication', (req, res) => {
  console.log(req.body.name, req.body.password, info.users.Admin)
  user = req.body.name;
  password = req.body.password;
  if(user == info.users.Admin.name && password == info.users.Admin.password){
    req.session.loggedin = true
  }
  res.redirect('/admin')
})

module.exports = Router