const express = require("express");
let Router = express.Router();


Router.get('/all', (req, res) => {
  const category = 'all'
  res.render('all-category', {category: category})
  console.log(req.params.category)
})


Router.get('/:category', (req, res) => {
  const category = req.params.category
  res.render('category', {category: category})
  console.log(req.params.category)
})



module.exports = Router;