const express = require("express");
const app = express();
let Router = express.Router();

Router.get('/:category', async(req, res) => {
  const category = req.params.category
  res.render('category', {category: category})
  console.log(req.params.category)
})



module.exports = Router;