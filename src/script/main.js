let handlebars = require('handlebars');

let myInfo = "<p>Application is : {{name}}</p>";

console.log(handlebars);
let template = handlebars.compile(myInfo);
let data = template({name: 'Light CMS'});

document.querySelector('.container').innerHTML = data;