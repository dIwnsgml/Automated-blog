let codeparts = document.querySelectorAll("pre");

/* for(let codepart of codeparts){
  var el = codepart,
    codeInside = codepart.innerText
    type = 'html'
    HTML = "",
    CSS = "",
    JS = "";
  console.log(codeInside)
  var data = {
    html               : HTML,
    css                : CSS,
    js                 : JS
  };
  var JSONstring = 
  JSON.stringify(data)
    // Quotes will screw up the JSON
    .replace(/"/g, "&​quot;") // careful copy and pasting, I had to use a zero-width space here to get markdown to post this.
    .replace(/'/g, "&apos;");
  var form = 
  '<form action="https://codepen.io/pen/define" method="POST" target="_blank">' + 
    '<input type="hidden" name="data" value=\'' + 
      JSONstring + 
      '\'>' + 
    '<input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">' +
  '</form>';
  el.append(form);
}; */

//contents

let contents = document.querySelector(".contents");
