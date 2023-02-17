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

const search_bar = document.querySelector(".input-search")
const search_btn = document.querySelector(".btn-search")


search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
  console.log(search_btn.style.color)
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
  console.log(search_btn.style.color)
})

//header change

const header = document.querySelector("header")

window.onscroll = function(e) {
  if(window.pageYOffset != 0) {
    header.style = "background-color: #fff;"
  } else {
    header.style = "background-color: transparent; border: none;"
  }
}

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

const guideline_blur = document.querySelector(".toggle_option_slider")
let dir = 0;
guideline_blur.addEventListener("click", () => {
  if (dir % 2 == 0){
    guideline_blur.style = "left: 0px;     background: rgba(255,255,255,.3);;"
  } else {
    guideline_blur.style = "left: 330px;     background: rgba(255,255,255,.3);"

  }
  dir += 1;
})

const category_btn1 = document.querySelector(".slide-item-1");
const category_btn2 = document.querySelector(".slide-item-2");
const category_btn3 = document.querySelector(".slide-item-3");
const category_btn4 = document.querySelector(".slide-item-4");
const category_btn5 = document.querySelector(".slide-item-5");

const items = document.querySelectorAll(".items > ul > li");

category_btn1.addEventListener("click", () => {
  for(let i = 0; i < items.length; i++){
    items[i].style = "display: block;";
  }
})

category_btn2.addEventListener("click", () => {
  for(let i = 0; i < items.length; i++){
    if(items[i].classList != "Java"){
      items[i].style = "display: none;";
    } else {
      items[i].style = "display: block;";
    }
  }
})

category_btn3.addEventListener("click", () => {
  for(let i = 0; i < items.length; i++){
    if(items[i].classList != "C"){
      items[i].style = "display: none;";
    } else {
      items[i].style = "display: block;";
    }
  }
})

category_btn4.addEventListener("click", () => {
  for(let i = 0; i < items.length; i++){
    if(items[i].classList != "JavaScript"){
      items[i].style = "display: none;";
    } else {
      items[i].style = "display: block;";
    }
  }
})

category_btn5.addEventListener("click", () => {
  for(let i = 0; i < items.length; i++){
    if(items[i].classList != "Python"){
      items[i].style = "display: none;";
    } else {
      items[i].style = "display: block;";
    }
  }
})