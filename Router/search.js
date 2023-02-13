const express = require("express");
const app = express();
let Router = express.Router(); 
/* const octokit = new Octokit({
  auth: "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"
});



octokit.paginate(octokit.rest.search.repos, {
  q: "#help-wanted",
  per_page: 1,
})
  .then(issues => {
    // issues is an array of all issue objects
    console.log(issues)
  })
 */



  /* Router.get('/', function (req, res, next) {
    res.render("search", {
      githubapi: githubapi
    })
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

module.exports = Router;