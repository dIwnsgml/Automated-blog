const express = require("express");
const Router = express.Router(); 

Router.post("/", async(req, res) => {
  const query = req.body.query;
  res.render('search', {query: query})
})

module.exports = Router;