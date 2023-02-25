const like_btn = document.querySelector("#btn_likes");

like_btn.addEventListener('click', (event) => {
  console.log(like_btn.innerHTML.split("Like")[1]);
  like_btn.innerHTML = '<i class="fa-regular fa-heart"></i>'+ " Like "+(parseInt(like_btn.innerHTML.split("Like")[1]) + 1);
  fetch(window.location.pathname+"/like", {method: 'POST'})
  .then(function(response) {
    console.log(response, Response)
    if(response.ok) {
      console.log('Like was recorded');
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
})

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

search_bar.addEventListener('focus', (event) => {
  search_btn.style.color = "#0000ff"
  console.log(search_btn.style.color)
})

search_bar.addEventListener('focusout', (event) => {
  search_btn.style.color = "#fff"
  console.log(search_btn.style.color)
})