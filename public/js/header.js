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


search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
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

search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
})