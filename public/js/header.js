(async () => {
  const response = await fetch("/getCategories", {method: 'POST'});
  const text = await response.json();
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
    const header_field_ul = document.querySelector("header .inner> ul > li > .item > ul");
    for(let i = 0; i < Object.keys(fields).length; i++){
      let field_li = document.createElement("li");
      header_field_ul.appendChild(field_li);
      let h3 = document.createElement("h3");
      h3.innerText = Object.keys(fields)[i];
      field_li.appendChild(h3);
      let item_list = document.createElement("div");
      item_list.setAttribute("class", "item-list");
      field_li.appendChild(item_list);
      let ul = document.createElement("ul");
      item_list.appendChild(ul);
      for(let j = 0; typeof fields[[Object.keys(fields)[i]]][j] != 'undefined'; j++){
        let category_li = document.createElement("li");
        ul.appendChild(category_li);
        let a = document.createElement("a");
        a.setAttribute("href", `../../category/${fields[[Object.keys(fields)[i]]][j].name}`);
        a.innerText = (fields[[Object.keys(fields)[i]]][j].name.replaceAll('_', ' '));
        category_li.appendChild(a)
      }
    }
})();

const search_bar = document.querySelector(".input-search")
const search_btn = document.querySelector(".btn-search")
const mobile_modal_btn = document.querySelector("#modal-btn .btn");
const modal = document.querySelector("#modal-btn .modal");
const x1 = document.querySelector("#modal-btn .l1");
const x2 = document.querySelector("#modal-btn .l2");
const main_img = document.querySelector("header #btn-logo img");

search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
});

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
});

let modal_state = 0;
let modal_ava = true;
console.log(mobile_modal_btn)
mobile_modal_btn.addEventListener('click', (event) => {
  if(modal_state == 0 && modal_ava){
    modal_ava = false;
    modal.style = "animation: modal-open 0.3s 0s forwards;";
    x1.style = "animation: x1 0.3s 0s forwards;";
    x2.style = "animation: x2 0.3s 0s forwards;";
    main_img.style = "filter: invert(100%);";
    modal_state = 1;
    console.log('t')
    setTimeout(()=> {
      modal.style.animation = null;
      modal.style = "left: 0px;";
      x1.style.animation = null;
      x2.style.animation = null;
      x1.style = "transform: rotate(-45deg);background-color: #fff;";
      x2.style = "transform: rotate(45deg);background-color: #fff; margin-top: 0px;";
      modal_ava = true;
    }, 300)
  } else if(modal_state == 1 && modal_ava) {
    modal_ava = false
    modal.style = "animation: modal-open 0.3s 0s reverse;";
    x1.style = "animation: x1 0.3s 0s reverse;";
    x2.style = "animation: x2 0.3s 0s reverse;";
    main_img.style = "filter: invert(0%);";
    modal_state = 0;
    console.log("c")
    setTimeout(()=> {
      modal.style.animation = null;
      modal.style = "left: 100vw;";
      x1.style.animation = null;
      x2.style.animation = null;
      x1.style = "transform: rotate(0deg);background-color: #74ccdf;";
      x2.style = "transform: rotate(0deg);background-color: #fa1682; margin-top: 10px;";
      modal_ava = true;
    }, 300)
  }
})

//header change

const header = document.querySelector("header")

window.onscroll = function(e) {
  if(this.oldScroll > this.scrollY) {
    header.style = "background-color: #e7e5de; top: 0px;"
  } else {
    header.style = "background-color: transparent; border: none; top: -120px;"
  }
  this.oldScroll = this.scrollY;
}

search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
})