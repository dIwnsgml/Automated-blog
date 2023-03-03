(async () => {
  const category = document.querySelector(".guideline .title").innerText.replaceAll(" ", "_");
  const response = await fetch(`/getArticlesforCategory/${category}`, {method: 'POST'});
  const articles = await response.json();
  
  const articles_wrapper = document.querySelector("ul.articles_wrapper");
  for(let i = 0; i < articles.length; i++){
    const li = document.createElement("li");
    li.setAttribute("class", category)
    articles_wrapper.appendChild(li); 
    const a = document.createElement("a");
    a.setAttribute("href", `../${articles[i].path}`)
    li.appendChild(a);
    const div_a_img = document.createElement("div");
    div_a_img.setAttribute("class", "img_area");
    a.appendChild(div_a_img);
    const img = document.createElement("img");
    img.setAttribute("src", articles[i].img_url);
    div_a_img.appendChild(img);
    const div_a_title = document.createElement("div");
    div_a_title.setAttribute("class", "topic");
    a.appendChild(div_a_title);
    const h3 = document.createElement("h3");
    h3.innerHTML = `${articles[i].title} <i class="fa-regular fa-heart"></i> ${articles[i].likes}`;
    div_a_title.appendChild(h3);
    const div_a_conetens = document.createElement("div");
    div_a_conetens.setAttribute("class", "explanation");
    a.appendChild(div_a_conetens);
    const h5 = document.createElement("h3");
    h5.innerText = articles[i].contents.replaceAll(';', '');
    div_a_conetens.appendChild(h5);
  }
})();
