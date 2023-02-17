const express = require("express");
const Router = express.Router();
const pool = require('../../model/pool');
const info = require("../../config/info.json")
const { Configuration, OpenAIApi } = require("openai");

/* connection.query("SELECT * FROM mongodb" ,(err, rows) => {
  console.log(rows[0].text)
}) */
Router.get('/article', async(req, res) => {
  const connection = await (await pool).getConnection()
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  res.render('admin/manage/article');
})

Router.get('/category', async(req, res) => {
  const connection = await (await pool).getConnection()
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  connection.query('SELECT * FROM category', (err, rows) => {
    var categories = '';
    let index = 0;
    console.log(rows)
    while(typeof rows[index] != 'undefined'){
      categories = categories.concat(" ",rows[index].name);
      index += 1;
    }

    res.render('admin/manage/category', {
      categories: rows,
    });
  })
})

Router.post('/category/create', async(req, res) => {
  const connection = await (await pool).getConnection()
  /* if(req.session.loggedin){
    res.render("admin")
  } else {
    res.render("login")
  }
  console.log(req.session.loggedin) */
  /* prompt should generate exept lang stored in database */
  connection.query('SELECT * FROM category', (err, rows) => {
    var categories = '';
    let index = 0;
    while(typeof rows[index] != 'undefined') {
      categories = categories.concat(" ", rows[index].name)
      index += 1;
      console.log(categories)
    };

    (async () => {
      const configuration = new Configuration({
        apiKey: info.OpenAiApi,
      });
      const openai = new OpenAIApi(configuration);
      
      try {
        let new_category = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `think about what one concept should be thaought in programming and devops blog that are not in this list (${categories})(only say the name of the language or devops without explanation)`,
          max_tokens: 15,
          temperature: 0,
        });
        new_category = new_category.data.choices[0].text.replace(' ', '_');
        new_category = new_category.replace(/[^a-z A-Z 0-9 _]/gi, '');

        /* planning blog post part */
        let new_topics = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `try to plan many blog posts as many as possible for ${new_category} that is really related to ${new_category}. For topic, anything you want that is closely related to this language such as dev environment setting. create 23 topics or more. Try to divide one post into many posts instead of putting many contents in one article.  ex) instead of putting variable, data types, operators, control flow, loops, functions in one post, put into individual post ex) post 1 only talks about variable, post 2 only talks about function, post 3 only talks about operators. (print only titles and list-up the contents)  rule: add - at start of each content, add ;% at the start of the title and divide the area of title and contents by  adding <---->`,
          max_tokens: 1000,
          temperature: 0,
        });

        new_topics = new_topics.data.choices[0].text;
        let new_topics_arr = new_topics.split(';%');
        /* remove blank */
        new_topics_arr.splice(0, 1);

        connection.query('INSERT INTO category SET ?', {name: new_category})
        console.log(new_category)
        connection.query(`CREATE TABLE ${new_category} (post_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(500), contents VARCHAR(20000), text varchar(65000), status varchar(30) default 'no')`)
        let index = 0;
        while(typeof new_topics_arr[index] != 'undefined'){
          //write article
          let new_text = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `write article that only talks about this topic:${new_topics_arr}. And write in HTML language (at important part, emphasize using h tags and p of html. And to show the code, use code snippet in html form. Explain each content  precisely as possible by giving many code example and give link when guiding users to download part. Try to write more than 2000 words)`,
            max_tokens: 3000,
            temperature: 0,
          });
          const post_info = {
            title: new_topics_arr[index].split('<---->')[0],
            contents: new_topics_arr[index].split('<---->')[1],
            text: new_text.data.choices[0].text,
          }
          connection.query(`INSERT INTO ${new_category} SET ?`, post_info);
          index += 1;
        }

        console.log(new_category, new_topics, new_topics_arr[0]);
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    })();
  });


})


module.exports = Router