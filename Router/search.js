const express = require("express");
const Router = express.Router(); 

Router.get("/:name", async(req, res) => {
  const query = req.params.name;
  console.log(query)
  res.render('search', {query: query})
})

module.exports = Router;