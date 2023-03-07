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
  const response = await fetch("/getCategories", {method: 'POST'});
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
        if(li[j].classList.contains((text[i - 1].name))){
          li[j].style.display = "block";
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
  //category_input_1.setAttribute("checked", "true")
  category_btn1.addEventListener("click", () => {
    let items = document.querySelectorAll(".items > ul > li");
    console.log(items)
    for(let i = 0; i < items.length; i++){
      console.log(items[i])
      items[i].style.display = "block";
    }
  });
})();


(async () => {
  const response = await fetch("/getArticles", {method: 'POST'});
  const response2 = await fetch("/getCategories", {method: 'POST'});
  const articles = await response.json();
  const categories = await response2.json();
  const articles_wrapper = document.querySelector("ul.articles_wrapper");
  for(let i = 0; i < articles.length; i++){
    for(let j = 0; j < articles[i].length; j++){
      const li = document.createElement("li");
      li.setAttribute("class", categories[i].name)
      articles_wrapper.appendChild(li); 
      const a = document.createElement("a");
      a.setAttribute("href", articles[i][j].path)
      li.appendChild(a);
      const div_a_img = document.createElement("div");
      div_a_img.setAttribute("class", "img_area");
      a.appendChild(div_a_img);
      const img = document.createElement("img");
      img.setAttribute("src", articles[i][j].img_url);
      div_a_img.appendChild(img);
      const div_a_title = document.createElement("div");
      div_a_title.setAttribute("class", "topic");
      a.appendChild(div_a_title);
      const h3 = document.createElement("h3");
      h3.innerHTML = `${articles[i][j].title} <i class="fa-regular fa-heart"></i> ${articles[i][j].likes}`;
      div_a_title.appendChild(h3);
      const div_a_conetens = document.createElement("div");
      div_a_conetens.setAttribute("class", "explanation");
      a.appendChild(div_a_conetens);
      const h5 = document.createElement("h3");
      h5.innerText = articles[i][j].contents.replaceAll(';', '');
      div_a_conetens.appendChild(h5);
    }
  }
})();
