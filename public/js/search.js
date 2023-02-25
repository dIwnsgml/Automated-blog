
(async () => {
  const response = await fetch("/getArticles", {method: 'POST'});
  const text = await response.json();
  console.log(text)
  const articles_wrapper = document.querySelector("ul.articles_wrapper");
  const query = document.querySelector("#query").innerText;
  console.log(query)
  for(let i = 0; i < text.length; i++){
    for(let j = 0; j < text[i].length; j++){
      if((text[i][j].title.toLowerCase().includes(query) == true) || (text[i][j].contents.toLowerCase().includes(query) == true)){
        console.log(text[i][j].title);
        const li = document.createElement("li");
        articles_wrapper.appendChild(li); 
        const a = document.createElement("a");
        a.setAttribute("href", text[i][j].path)
        li.appendChild(a);
        const div_a_img = document.createElement("div");
        div_a_img.setAttribute("class", "img");
        a.appendChild(div_a_img);
        const img = document.createElement("img");
        img.setAttribute("src", text[i][j].img_url);
        div_a_img.appendChild(img);
        const div_a_title = document.createElement("div");
        div_a_title.setAttribute("class", "title");
        a.appendChild(div_a_title);
        const h3 = document.createElement("h3");
        h3.innerText = text[i][j].title;
        div_a_title.appendChild(h3);
        const div_a_conetens = document.createElement("div");
        div_a_conetens.setAttribute("class", "contents");
        a.appendChild(div_a_conetens);
        const h5 = document.createElement("h5");
        h5.innerText = text[i][j].contents.replaceAll(';', '');
        div_a_conetens.appendChild(h5);
      }
    }
  }
})();
