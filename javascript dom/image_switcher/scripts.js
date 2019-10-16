
var mainImg = document.getElementById("mainImg").getElementsByTagName("img")[0];
var thumbs = document.getElementsByClassName("thumb");
for (var i = 0; i <thumbs.length; i++) {
  thumbs[i].addEventListener("click", function(){
    mainImg.src = this.src;
    
  });
};
