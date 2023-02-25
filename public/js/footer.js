(async () => {
  const response = await fetch("/getCategories", {method: 'POST'});
  const text = await response.json();
  const footer_ul = document.querySelector("footer .categories ul");
  for(let i = 0; i < text.length; i++){
    let li = document.createElement("li");
    footer_ul.appendChild(li);
    let a = document.createElement("a");
    a.setAttribute('href', `/category/${text[i].name}`);
    a.innerText = text[i].name;
    li.appendChild(a)
  }
})();