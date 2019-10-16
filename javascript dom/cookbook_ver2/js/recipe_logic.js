

//pull elements
var recipe_title_id = document.getElementById("recipe_title");
var author_id = document.getElementById("author");
var photo_id = document.getElementById("photo");
var ingriedients_id = document.getElementById("ingriedients");
var method_id = document.getElementById("method");

//var to assign data
var author = "";
var head = "";
var photo = "";
var ingriedients = [];
var method = [];

//assign data to vars
head = "<h2>" + recipeData[0].title + "</h2>";
author = "<p>By " + recipeData[0].author + "</p>";
photo = "<a><img src=" + recipeData[0].photo + " alt=pizza></a>"

for (var i = 0; i < recipeData[0].ingriedients.length; i++) {
  ingriedients[i] = "<li>" + recipeData[0].ingriedients[i].amount + " " +
   recipeData[0].ingriedients[i].unit + " " + recipeData[0].ingriedients[i].name + "</li>";
  }
for (var i = 0; i < recipeData[0].method.length; i++) {
  method[i]= "<li>" + recipeData[0].method[i] + "</li>";
}
//push data back to page

recipe_title_id.innerHTML = head;
author_id.innerHTML = author;
photo_id.innerHTML = photo;
ingriedients_id.innerHTML = ingriedients;
method_id.innerHTML = method;
