(async () => {
  const response = await fetch("/getCategories", {method: 'POST'});
  const text = await response.json();
  const footer_ul = document.querySelector("footer .categories ul");
  for(let i = 0; i < text.length; i++){
    let li = document.createElement("li");
    footer_ul.appendChild(li);
    let a = document.createElement("a");
    a.setAttribute('href', `/category/${text[i].name}`);
    a.innerText = text[i].name.replace(/_/, ' ');
    li.appendChild(a)
  }
})();

document.querySelector('.submit-email').addEventListener('mousedown', (e) => {
  e.preventDefault();
  document.querySelector('.subscription').classList.add('done');
  const email = document.querySelector("input.add-email").value;
  fetch(`/subscribe/${email}`, {method: 'post'});
});