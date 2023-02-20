const like_btn = document.querySelector("#btn_likes")
like_btn.addEventListener('click', (event) => {
  console.log(window.location.pathname+"/like")
  fetch(window.location.pathname+"/like", {method: 'POST'})
  .then(function(response) {
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
