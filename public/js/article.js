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