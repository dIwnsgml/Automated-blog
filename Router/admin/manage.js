const express = require("express");
const Router = express.Router();
const pool = require('../../model/pool');
const info = require("../../config/info.json")
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

/* const options = {
  method: 'GET',
  url: 'https://www.instagram.com/' + 'account4socialn' + '/following',
  responseType: 'html',
  params: {session_key: '<REQUIRED>'},
  headers: {
  }
}; */
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
      console.log("prev caegories:" + categories)
    };

    (async () => {
      const configuration = new Configuration({
        apiKey: info.OpenAiApi,
      });
      const openai = new OpenAIApi(configuration);
      
      try {
        const fields = ['software', 'hardware', 'algorithm', 'programming language', 'data structure', 'computer architectre', 'networking'];
        let field = fields[Math.floor(Math.random() * (fields.length))];
        console.log(field);

        
        let new_category = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Think one thing to talk about ${field} that is not in this list (${categories}). (only say the name of the concepts without explanation and periods).`,
          max_tokens: 15,
          temperature: 1,
        });

        let img_url;
        const crawlerOpt = {
          method: 'GET',
          url: `https://google.com/search?q=programming ${new_category.data.choices[0].text} logo&tbm=isch`,
          responseType: 'html',
          headers: {
            
          }
        }
        //crawling blog main img
        axios.request(crawlerOpt).then(function (response) {
          img_url = response.data.split('"yWs4tf" alt=')[1].split('="')[1].split('"')[0];
          /* console.log(img_url); */
        }).catch(function (error) {
          console.error(error);
        }); 
        new_category = new_category.data.choices[0].text.replaceAll(' ', '_');
        new_category = new_category.replaceAll(/[^a-z A-Z 0-9 _]/gi, '');
        /* planning blog post part */
        console.log(`writing blog posts for ${new_category}`);
        let new_topics = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Plan between 20 to 30 blog posts about ${new_category}. Only use A-Z for title of the ppost and don't put numbers. Only print each post's title and its contents. For title, you can use anything that you want that is closely related to the ${new_category} such as dev environment setting. Don't put anything in front of the title such as numbers. Try to divide one information into as many posts as possible instead of putting many contents in one article. ex) instead of putting variables, data types, operators, control flow, loops, functions in one post, put them into individual posts. Rule: print only titles and list-up the contents. Add "-" at the start of each contents, and add ";" at the end of each contents. At the start of each titles, add ";%". Divide the area of title and contents by adding "<---->".`,
          max_tokens: 1000,
          temperature: 0,
        });

        new_topics = new_topics.data.choices[0].text;
        let new_topics_arr = new_topics.split(';%');
        /* remove blank */
        new_topics_arr.splice(0, 1);

        connection.query('INSERT INTO category SET ?', {name: new_category, field: field});
        connection.query(`CREATE TABLE ${new_category} (post_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(500), contents VARCHAR(20000), text varchar(45000), img_url varchar(200), likes int(200) default 0, views int(200) default 0, path varchar(300), field varchar(100), status varchar(30) default 'no')`)
        let index = 0;
        while(typeof new_topics_arr[index] != 'undefined'){
          //write article
          let new_text = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `write an article about this topic:${new_topics_arr[index]}. Write ENTIRE article in HTML language. DO NOT USE PLAIN TEXT. (For example, at important part, emphasize using h tags and use p tag of HTML to pain text. There should be no text that is not in HTML form. And to show the code or command, use code snippets in html form. Explain each content very precisely and very deeply as much as possible by giving many code examples, giving many explanations and giving links when guiding users. If it’s possible, also put an img tag to show img.  Don't put information that the previously generated articles contained, only put information that was inside the contents part and title of the article. Try to write between 2000 words and 2500 words).`,
            max_tokens: 2500,
            temperature: 0,
          });
          const post_info = {
            title: new_topics_arr[index].split('<---->')[0],
            contents: new_topics_arr[index].split('<---->')[1],
            text: new_text.data.choices[0].text,
            path:('article/'+new_category+'/'+new_topics_arr[index].split('<---->')[0]).replaceAll(' ', "%20"),
            img_url: img_url,
            field: field
          }
          connection.query(`INSERT INTO ${new_category} SET ?`, post_info);
          console.log(`new post created: title: ${post_info.title}, contents: ${post_info.contents}`)
          index += 1;
        }

        console.log("complete!");
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