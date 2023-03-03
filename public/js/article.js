const like_btn = document.querySelector("#btn_likes");

like_btn.addEventListener('click', (event) => {
  like_btn.innerHTML = '<i class="fa-regular fa-heart"></i>'+ " Like "+(parseInt(like_btn.innerHTML.split("Like")[1]) + 1);
  fetch(window.location.pathname+"/like", {method: 'POST'})
  .then(function(response) {
    if(response.ok) {
      console.log('Like was recorded');
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
  });
});

(async () => {
  const path = window.location.pathname;
  const category = path.split("/")[2];
  const title = path.split("/")[3];
  const response = await fetch(`/article/getArticle/${category}/${title}`, {method: 'POST'});
  const article = await response.json();
  
  const text_area = document.querySelector(".text");
  text_area.innerHTML = article.text;

  const contents = document.querySelector(".contents");
  const conh3 = document.createElement("h3");
  conh3.innerHTML = article.contents.replace(/;/g, "<br>")
  contents.appendChild(conh3);

  const likes = document.querySelector(".likes button");
  likes.innerHTML = `<i class="fa-regular fa-heart"></i> Like ${article.likes}`;

  //related aticles
  const response2 = await fetch(`/article/getRelatedArticles/${category}`, {method: 'POST'});
  const related_articles = await response2.json();
  const articles_wrapper = document.querySelector(".articles-wrapper");
  for(let i = 0; i < related_articles.length; i++){
    articles_wrapper.innerHTML += `<div class='related_articles' id=${related_articles[i].post_id}>
    <a href=../../${related_articles[i].path}>
      <div class="img_area">
        <img src=${related_articles[i].img_url} alt="">
      </div>
      <div class="topic">
        <h3>
          ${related_articles[i].title}
        </h3>
      </div>
      <div class="explanation">
        <h3>${related_articles[i].contents.replace(/;/g, "<br>")}</h3>
      </div>
      <div class='tags'>
        <p></p>
      </div>
    </a>
  </div>`
  }
})();