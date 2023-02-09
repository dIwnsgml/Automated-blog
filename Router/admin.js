const express = require("express");
const Router = express.Router();
const connection = require('../model/db');
const info = require("../config/info.json")

Router.get('/', (req, res) => {
  res.render('login')
})

Router.get('/authentication', (req, res) => {
  res
})

module.exports = Router