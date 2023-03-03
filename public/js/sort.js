const btn_sort_views = document.querySelector("#sortChoice1");
btn_sort_views.addEventListener('click', async () => {
  const active_category = document.querySelector("input.slide-toggle:checked");
  const active_category_name = document.querySelector(`label.${active_category.id}`).className.split(' ')[1];
  const response = await fetch(`/sort/${active_category_name}`, {method: 'POST'});
  const text = await response.json();
  let articles = [];
  let index = 0;
  for(let i = 0; typeof text.article[i] != 'undefined'; i++){
    for(let j = 0; typeof text.article[i][j] != 'undefined'; j++){
      articles[index] = text.article[i][j];
      index += 1;
    }
  }
  articles.sort((a, b) => {
    if(a.views > b.views){
      return -1;
    }
    if(a.views < b.views){
      return 1;
    }
    return 0;
  });

  let article_container = document.querySelectorAll(".items > ul > li")
  for(let i = 0; i < articles.length; i++){
    article_container[i].innerHTML = `<a href=${articles[i].path}><div class="img_area"><img src = ${articles[i].img_url} alt = ""></div><div class = "topic"><h3>${articles[i].title} <i class="fa-regular fa-heart"></i> ${articles[i].likes}</h3></div><div class="explanation"><h3>${articles[i].contents.replaceAll(';',"<br>")}</h3></div><div class="tags"><p></p></div></a>`
  }
})

const btn_sort_likes = document.querySelector("#sortChoice2");
btn_sort_likes.addEventListener('click', async () => {
  const active_category = document.querySelector("input.slide-toggle:checked");
  const active_category_name = document.querySelector(`label.${active_category.id}`).className.split(' ')[1];
  const response = await fetch(`/sort/${active_category_name}`, {method: 'POST'});
  const text = await response.json();
  let articles = [];
  let index = 0;
  for(let i = 0; typeof text.article[i] != 'undefined'; i++){
    for(let j = 0; typeof text.article[i][j] != 'undefined'; j++){
      articles[index] = text.article[i][j];
      index += 1;
    }
  }
  articles.sort((a, b) => {
    if(a.likes > b.likes){
      return -1;
    }
    if(a.likes < b.likes){
      return 1;
    }
    return 0;
  });

  let article_container = document.querySelectorAll(".items > ul > li")
  for(let i = 0; i < articles.length; i++){
    article_container[i].innerHTML = `<a href=${articles[i].path}><div class="img_area"><img src = ${articles[i].img_url} alt = ""></div><div class = "topic"><h3>${articles[i].title} <i class="fa-regular fa-heart"></i> ${articles[i].likes}</h3></div><div class="explanation"><h3>${articles[i].contents.replaceAll(';',"<br>")}</h3></div><div class="tags"><p></p></div></a>`;
    
  }
})

const btn_sort_category = document.querySelector("#sortChoice3");
btn_sort_category.addEventListener('click', async () => {
  const active_category = document.querySelector("input.slide-toggle:checked");
  const active_category_name = document.querySelector(`label.${active_category.id}`).className.split(' ')[1];
  const response = await fetch(`/sort/${active_category_name}`, {method: 'POST'});
  const text = await response.json();

  let articles = [];
  let index = 0;
  for(let i = 0; typeof text.article[i] != 'undefined'; i++){
    for(let j = 0; typeof text.article[i][j] != 'undefined'; j++){
      articles[index] = text.article[i][j];
      index += 1;
    }
  }

  let article_container = document.querySelectorAll(".items > ul > li")
  for(let i = 0; i < articles.length; i++){
    article_container[i].innerHTML = `<a href=${articles[i].path}><div class="img_area"><img src = ${articles[i].img_url} alt = ""></div><div class = "topic"><h3>${articles[i].title} <i class="fa-regular fa-heart"></i> ${articles[i].likes}</h3></div><div class="explanation"><h3>${articles[i].contents.replaceAll(';',"<br>")}</h3></div><div class="tags"><p></p></div></a>`
  }
});
