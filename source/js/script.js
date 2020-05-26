var isStorageSupport = true;
var storage = "";

try {
storage = localStorage.getItem("name");
} catch (err) {
isStorageSupport = false;
}
var menuDefault = document.querySelector(".open-nav__wrapper");

var menu = document.querySelector(".main-nav");

var menuColor = document.querySelector(".open-nav");

var closeMenu = document.querySelector(".main-nav__close");

var openMenu = document.querySelector(".main-nav__toggle");

document.querySelector (".main-nav")
.classList.remove("open");

document.querySelector (".main-nav")
.classList.add("close");

document.querySelector (".main-nav__toggle")
.classList.add("open");

document.querySelector (".open-nav")
.classList.add("background-open");

openMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.remove("close")
  menu.classList.add("open");
  menuColor.classList.remove("background-open");
  menuDefault.classList.add("open");
  openMenu.classList.add("close")
  closeMenu.classList.remove("close");
  closeMenu.classList.add("open");
});

closeMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeMenu.classList.add("close");
  openMenu.classList.remove("close")
  openMenu.classList.add("open__toggle")
  menu.classList.remove("open")
  menu.classList.add("close")
  menuDefault.classList.remove("open");
  menuColor.classList.add("background-open");
});
