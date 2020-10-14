let btn = document.querySelector(".navbar-toggler");
let isShowed = false;
let navbar = document.querySelector(".navbar-collapse");

btn.addEventListener("click", () => {
  if (!isShowed) {
    navbar.style.display = "flex";
    isShowed = !isShowed;
  } else if (isShowed) {
    navbar.style.display = "none";
    isShowed = !isShowed;
  }
});
