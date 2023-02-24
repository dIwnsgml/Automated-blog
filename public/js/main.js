const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  /* autoplay: { 
    disableOnInteraction: false,
    delay: 3000 
  }, */
  centeredSlides: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }

  // And if we need scrollbar

});


search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
  console.log(search_btn.style.color)
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
  console.log(search_btn.style.color)
})



const barOuter = document.querySelector(".bar-outer");
const options = document.querySelectorAll(".bar-grey .option");
let current = 1;
options.forEach((option, i) => (option.index = i + 1));
options.forEach(option =>
                option.addEventListener("click", function() {
  barOuter.className = "bar-outer";
  barOuter.classList.add(`pos${option.index}`);
  if (option.index > current) {
    barOuter.classList.add("right");
  } else if (option.index < current) {
    barOuter.classList.add("left");
  }
  current = option.index;
}));


//For category slider
(async () => {
  const category_slider = document.querySelector(".slidemenu");
  const response = await fetch("/getinfo", {method: 'POST'});
  const text = await response.json();
  text.sort((a, b) => {
    if(a.likes * 3 + a.views * 7 > b.likes * 3 + b.views * 7) {
      return -1
    }
    if(a.likes * 3 + a.views * 7 < b.likes * 3 + b.views * 7) {
      return 1
    }
    return 0;
  });
  let popular_categories = document.querySelectorAll(".slide-item");

  for(let i = 1; (i < text.length) && i < 10; i++ ){
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "slideItem")
    input.setAttribute("id", `slide-item-${i + 1}`);
    input.setAttribute("class", "slide-toggle");
    //input.setAttribute("checked", "true");
    category_slider.appendChild(input)
    var label = document.createElement("label");
    label.setAttribute("for", `slide-item-${i + 1}`);
    label.setAttribute("class", `slide-item-${i + 1} ${text[i - 1].name}`);
    category_slider.appendChild(label);
    let button = document.createElement("button");
    button.setAttribute("class", "icon");
    label.appendChild(button);
    let span = document.createElement("span");
    span.innerText = text[i - 1].name.replaceAll("_", " ");
    label.appendChild(span);
    label.addEventListener('click', () => {
      let li = document.querySelectorAll(".items > ul > li");
      for(let j = 0; j < li.length; j ++){
        if(li[j].classList.contains((text[i - 1].name).toLowerCase())){
          li[j].style.display = "block";
          console.log(li[j].classList, (text[i - 1].name).toLowerCase(), li[j].classList.contains((text[i - 1].name).toLowerCase()))
        } else {
          li[j].style.display = "none";
        }
      }
    })
  }
  let clear = document.createElement("div");
  clear.setAttribute("class", "clear");
  category_slider.appendChild(clear);
  let slider = document.createElement("div");
  slider.setAttribute("class", "slider");
  category_slider.appendChild(slider);
  let bar = document.createElement("div");
  bar.setAttribute("class", "bar");
  slider.appendChild(bar);

  const category_btn1 = document.querySelector(".slide-item-1");
  const category_input_1 = document.querySelector("#slide-item-1");
  const items = document.querySelectorAll(".items > ul > li");
  //category_input_1.setAttribute("checked", "true")
  category_btn1.addEventListener("click", () => {
    for(let i = 0; i < items.length; i++){
      items[i].style = "display: block;";
    }
  });

  //header
  const fields = {};
  for(let i = 0; i < text.length; i++){
    if(fields[text[i].field]){
      fields[text[i].field][parseInt(Object.keys(fields[text[i].field])[Object.keys(fields[text[i].field]).length - 1]) + 1] = text[i]
    } else {
      fields[text[i].field] = {}
      fields[text[i].field][0] = text[i];
    }
  }
  console.log(fields, text.length)
  const header_field_ul = document.querySelector("header .inner> ul > li > .item > ul");
  for(let i = 0; i < Object.keys(fields).length; i++){
    let field_li = document.createElement("li");
    header_field_ul.appendChild(field_li);
    let h3 = document.createElement("h3");
    console.log(Object.keys(fields)[i])
    h3.innerText = Object.keys(fields)[i];
    field_li.appendChild(h3);
    let item_list = document.createElement("div");
    item_list.setAttribute("class", "item-list");
    field_li.appendChild(item_list);
    let ul = document.createElement("ul");
    item_list.appendChild(ul);
    console.log(fields[[Object.keys(fields)[i]]][0])
    for(let j = 0; typeof fields[[Object.keys(fields)[i]]][j] != 'undefined'; j++){
      let category_li = document.createElement("li");
      ul.appendChild(category_li);
      let a = document.createElement("a");
      a.setAttribute("href", `category/${fields[[Object.keys(fields)[i]]][j].name}`);
      a.innerText = (fields[[Object.keys(fields)[i]]][j].name.replaceAll('_', ' '));
      //console.log(fields[text[i].field])
      category_li.appendChild(a)
    }
  }
})();


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
  console.log(articles[0])
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
  console.log(articles[0])
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
    console.log(article_container[i]);
  }
})

const btn_sort_category = document.querySelector("#sortChoice3");
btn_sort_category.addEventListener('click', async () => {
  const active_category = document.querySelector("input.slide-toggle:checked");
  const active_category_name = document.querySelector(`label.${active_category.id}`).className.split(' ')[1];
  const response = await fetch(`/sort/${active_category_name}`, {method: 'POST'});
  const text = await response.json();
  console.log(text.article[0][0].views);
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
