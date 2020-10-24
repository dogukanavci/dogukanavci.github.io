window.addEventListener("scroll", function () {
    myFunction();
}, false);

window.addEventListener("load", function () {
    //LoadGame();
}, false);

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;


navbar.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target,
        text = target.textContent || target.innerText;   
    navbarClicked(target);
}, false);

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function navbarClicked(target){
    navbar.getElementsByClassName("active")[0].classList.remove("active");
    target.classList.add("active");
}

function LoadGame(){
    startGame();
}
