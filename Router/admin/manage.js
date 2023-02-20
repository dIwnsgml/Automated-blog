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
        })
        let img_url;
        const crawlerOpt = {
          method: 'GET',
          url: `https://google.com/search?q=programming ${new_category.data.choices[0].text} logo&tbm=isch`,
          responseType: 'html',
          headers: {
            
          }
        }
        axios.request(crawlerOpt).then(function (response) {
          img_url = response.data.split('"yWs4tf" alt=')[1].split('="')[1].split('"')[0];
          /* console.log(img_url); */
        }).catch(function (error) {
          console.error(error);
        }); 
        new_category = new_category.data.choices[0].text.replace(' ', '_');
        new_category = new_category.replace(/[^a-z A-Z 0-9 _]/gi, '');
        console.log(img_url)
        /* planning blog post part */
        let new_topics = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Plan between 20 to 30 blog posts about ${new_category}. Only print each post's title and its contents. For title, you can use anything that you want that is closely related to the ${new_category} such as dev environment setting. Don't put anything in front of the title such as numbers. Try to divide one information into as many posts as possible instead of putting many contents in one article. ex) instead of putting variables, data types, operators, control flow, loops, functions in one post, put them into individual posts. Rule: print only titles and list-up the contents. ex) add - at the start of each contents, add ;% at the start of the title and divide the area of title and contents by adding <---->.`,
          max_tokens: 1000,
          temperature: 0,
        });

        new_topics = new_topics.data.choices[0].text;
        let new_topics_arr = new_topics.split(';%');
        /* remove blank */
        new_topics_arr.splice(0, 1);

        connection.query('INSERT INTO category SET ?', {name: new_category})
        console.log(new_category)
        connection.query(`CREATE TABLE ${new_category} (post_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(500), contents VARCHAR(20000), text varchar(45000), img_url varchar(200), likes int(100) default 0, status varchar(30) default 'no')`)
        let index = 0;
        while(typeof new_topics_arr[index] != 'undefined'){
          //write article
          let new_text = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `write an article that only talks about this topic:${new_topics_arr[index]}. Write article in HTML language (For example, at important part, emphasize using h tags and use p tag of HTML to show simple text. And to show the code or command, use code snippets in html form. Explain each content  precisely as possible by giving many code examples and giving links when guiding users to download parts. If it’s possible, also put an img tag to show img.  Don't put information that the previously generated articles contained, only put information that was inside the contents part and title of the article. Try to write between 2000 words and 2500 words).`,
            max_tokens: 2500,
            temperature: 0,
          });
          const post_info = {
            title: new_topics_arr[index].split('<---->')[0],
            contents: new_topics_arr[index].split('<---->')[1],
            text: new_text.data.choices[0].text,
            img_url: img_url,
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