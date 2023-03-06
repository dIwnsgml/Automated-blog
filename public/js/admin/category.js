const create_category = document.querySelector("#create_category");

create_category.addEventListener('click', (event) => {
  console.log("a")
  fetch('/admin/manage/category/create', {method: 'POST'})
  .then(function(response) {
    if(response.ok) {
      console.log('Click was recorded');
      return;
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
})