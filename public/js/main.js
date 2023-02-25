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
  const items = document.querySelectorAll(".items > ul > li");
  //category_input_1.setAttribute("checked", "true")
  category_btn1.addEventListener("click", () => {
    for(let i = 0; i < items.length; i++){
      items[i].style = "display: block;";
    }
  });
})();
